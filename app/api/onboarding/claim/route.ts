import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { InvitationStatus, UserStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import {
  prismaRoleToKp,
  prismaStatusToApproval,
  syncClerkMembership,
} from "@/lib/auth/server";

export const runtime = "nodejs";

/**
 * Links the signed-in Clerk user to their invitation, creating a PENDING
 * member record. Idempotent: returns the current state if already claimed.
 */
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cc = await clerkClient();
  const clerkUser = await cc.users.getUser(userId);
  const email = clerkUser.primaryEmailAddress?.emailAddress?.toLowerCase() ?? null;

  // Already a member? Just report the current status.
  const existing = await prisma.user.findUnique({ where: { clerkUserId: userId } });
  if (existing) {
    return NextResponse.json({
      status: prismaStatusToApproval(existing.status),
      role: prismaRoleToKp(existing.role),
    });
  }

  let body: { token?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    /* token may instead come from Clerk unsafeMetadata */
  }

  const tokenFromBody = typeof body.token === "string" ? body.token : null;
  const tokenFromMeta =
    typeof (clerkUser.unsafeMetadata as Record<string, unknown> | null)
      ?.invitationToken === "string"
      ? ((clerkUser.unsafeMetadata as Record<string, unknown>)
          .invitationToken as string)
      : null;
  const token = tokenFromBody ?? tokenFromMeta;

  if (!token) {
    return NextResponse.json({ error: "Missing invitation token" }, { status: 400 });
  }

  const invitation = await prisma.invitation.findUnique({ where: { token } });
  if (
    !invitation ||
    invitation.status !== InvitationStatus.PENDING ||
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

  const member = await prisma.$transaction(async (tx) => {
    const created = await tx.user.create({
      data: {
        clerkUserId: userId,
        email: email ?? invitation.email,
        fullName:
          [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
          null,
        role: invitation.role,
        status: UserStatus.PENDING,
        invitationId: invitation.id,
      },
    });

    await tx.invitation.update({
      where: { id: invitation.id },
      data: { status: InvitationStatus.ACCEPTED, acceptedAt: new Date() },
    });

    return created;
  });

  await syncClerkMembership(userId, member.role, member.status);

  return NextResponse.json({
    status: prismaStatusToApproval(member.status),
    role: prismaRoleToKp(member.role),
  });
}
