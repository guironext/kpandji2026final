import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import {
  db,
  invitations,
  users,
  InvitationStatus,
  UserRole,
  UserStatus,
} from "@/lib/db";
import {
  prismaRoleToKp,
  prismaStatusToApproval,
  syncClerkMembership,
} from "@/lib/auth/server";

export const runtime = "nodejs";

type ClaimBody = {
  token?: unknown;
  fullName?: unknown;
  phone?: unknown;
  residenceCountry?: unknown;
  role?: unknown;
};

function parseRole(value: unknown): UserRole {
  return value === "ADMIN" || value === "admin" ? UserRole.ADMIN : UserRole.PRESTIGE_USER;
}

function resolveRole(
  invitation: { role: UserRole } | null,
  requestedRole: UserRole
): UserRole {
  if (invitation) {
    return requestedRole !== invitation.role ? invitation.role : requestedRole;
  }
  return requestedRole === UserRole.ADMIN ? UserRole.ADMIN : UserRole.PRESTIGE_USER;
}

function clerkFullName(
  clerkUser: { firstName: string | null; lastName: string | null }
): string | null {
  return [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;
}

function needsProfile(member: {
  fullName: string | null;
  phone: string | null;
  residenceCountry: string | null;
}): boolean {
  return (
    !member.fullName?.trim() ||
    !member.phone?.trim() ||
    !member.residenceCountry?.trim()
  );
}

/**
 * Links the signed-in Clerk user to their invitation and saves profile
 * details (name, phone, role). Idempotent for already-complete profiles.
 */
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cc = await clerkClient();
  const clerkUser = await cc.users.getUser(userId);
  const email = clerkUser.primaryEmailAddress?.emailAddress?.toLowerCase() ?? null;

  let body: ClaimBody = {};
  try {
    body = await request.json();
  } catch {
    /* token may instead come from Clerk unsafeMetadata */
  }

  const fullName =
    typeof body.fullName === "string" ? body.fullName.trim() || null : null;
  const phone = typeof body.phone === "string" ? body.phone.trim() || null : null;
  const residenceCountry =
    typeof body.residenceCountry === "string"
      ? body.residenceCountry.trim() || null
      : null;
  const requestedRole = parseRole(body.role);

  const tokenFromBody = typeof body.token === "string" ? body.token : null;
  const tokenFromMeta =
    typeof (clerkUser.unsafeMetadata as Record<string, unknown> | null)
      ?.invitationToken === "string"
      ? ((clerkUser.unsafeMetadata as Record<string, unknown>)
          .invitationToken as string)
      : null;
  const token = tokenFromBody ?? tokenFromMeta;

  const existing = await db.query.users.findFirst({
    where: eq(users.clerkUserId, userId),
  });

  if (existing && !needsProfile(existing)) {
    return NextResponse.json({
      status: prismaStatusToApproval(existing.status),
      role: prismaRoleToKp(existing.role),
      fullName: existing.fullName,
      phone: existing.phone,
      residenceCountry: existing.residenceCountry,
      needsProfile: false,
    });
  }

  if (!fullName) {
    return NextResponse.json({ error: "Indiquez votre nom complet." }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ error: "Indiquez votre numéro de téléphone." }, { status: 400 });
  }
  if (!residenceCountry) {
    return NextResponse.json(
      { error: "Indiquez votre pays de résidence." },
      { status: 400 }
    );
  }

  let invitation = null;
  if (token) {
    invitation = await db.query.invitations.findFirst({
      where: eq(invitations.token, token),
    });
    if (
      !invitation ||
      (invitation.status !== InvitationStatus.PENDING &&
        invitation.status !== InvitationStatus.ACCEPTED) ||
      invitation.expiresAt.getTime() < Date.now()
    ) {
      return NextResponse.json({ error: "Invitation is no longer valid" }, { status: 410 });
    }

    if (email && invitation.email.toLowerCase() !== email) {
      return NextResponse.json(
        { error: "This invitation was issued for a different email" },
        { status: 403 }
      );
    }
  }

  const role = resolveRole(invitation, requestedRole);

  if (existing) {
    const [updated] = await db
      .update(users)
      .set({
        fullName,
        phone,
        residenceCountry,
        role,
        ...(role === UserRole.ADMIN && existing.status === UserStatus.PENDING
          ? { status: UserStatus.APPROVED, approvedAt: new Date() }
          : {}),
        ...(invitation && !existing.invitationId
          ? { invitationId: invitation.id }
          : {}),
      })
      .where(eq(users.id, existing.id))
      .returning();

    if (invitation?.status === InvitationStatus.PENDING) {
      await db
        .update(invitations)
        .set({ status: InvitationStatus.ACCEPTED, acceptedAt: new Date() })
        .where(eq(invitations.id, invitation.id));
    }

    await syncClerkMembership(userId, updated.role, updated.status);

    return NextResponse.json({
      status: prismaStatusToApproval(updated.status),
      role: prismaRoleToKp(updated.role),
      fullName: updated.fullName,
      phone: updated.phone,
      residenceCountry: updated.residenceCountry,
      needsProfile: needsProfile(updated),
    });
  }

  if (role !== UserRole.ADMIN && !invitation) {
    return NextResponse.json({ error: "Missing invitation token" }, { status: 400 });
  }

  if (role === UserRole.ADMIN && !email) {
    return NextResponse.json({ error: "Email requis." }, { status: 400 });
  }

  const member =
    role === UserRole.ADMIN && !invitation
      ? (
          await db
            .insert(users)
            .values({
              clerkUserId: userId,
              email: email!,
              fullName: fullName ?? clerkFullName(clerkUser),
              phone,
              residenceCountry,
              role: UserRole.ADMIN,
              status: UserStatus.APPROVED,
              approvedAt: new Date(),
            })
            .returning()
        )[0]
      : await db.transaction(async (tx) => {
          const [created] = await tx
            .insert(users)
            .values({
              clerkUserId: userId,
              email: email ?? invitation!.email,
              fullName: fullName ?? clerkFullName(clerkUser),
              phone,
              residenceCountry,
              role,
              status: UserStatus.PENDING,
              invitationId: invitation!.id,
            })
            .returning();

          if (invitation!.status === InvitationStatus.PENDING) {
            await tx
              .update(invitations)
              .set({ status: InvitationStatus.ACCEPTED, acceptedAt: new Date() })
              .where(eq(invitations.id, invitation!.id));
          }

          return created;
        });

  await syncClerkMembership(userId, member.role, member.status);

  return NextResponse.json({
    status: prismaStatusToApproval(member.status),
    role: prismaRoleToKp(member.role),
    fullName: member.fullName,
    phone: member.phone,
    residenceCountry: member.residenceCountry,
    needsProfile: needsProfile(member),
  });
}
