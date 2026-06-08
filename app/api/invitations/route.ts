import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { and, desc, eq } from "drizzle-orm";
import { db, invitations, users, InvitationStatus, UserRole } from "@/lib/db";
import { requireAdminUserId } from "@/lib/auth/server";

export const runtime = "nodejs";

const INVITE_TTL_DAYS = 14;

function inviteUrl(token: string): string {
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "";
  const path = `/sign-up?token=${token}`;
  return base ? `${base}${path}` : path;
}

export async function GET() {
  const adminId = await requireAdminUserId();
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const rows = await db.query.invitations.findMany({
    orderBy: desc(invitations.createdAt),
    limit: 100,
  });

  return NextResponse.json({
    invitations: rows.map((i) => ({
      ...i,
      url: inviteUrl(i.token),
    })),
  });
}

export async function POST(request: Request) {
  const adminId = await requireAdminUserId();
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { email?: unknown; role?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  const role = body.role === "admin" ? UserRole.ADMIN : UserRole.PRESTIGE_USER;

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (existingUser) {
    return NextResponse.json(
      { error: "This email already has an account" },
      { status: 409 }
    );
  }

  // Revoke any still-pending invitation for the same email before issuing a fresh one.
  await db
    .update(invitations)
    .set({ status: InvitationStatus.REVOKED })
    .where(
      and(
        eq(invitations.email, email),
        eq(invitations.status, InvitationStatus.PENDING)
      )
    );

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + INVITE_TTL_DAYS * 24 * 60 * 60 * 1000);

  const [invitation] = await db
    .insert(invitations)
    .values({
      email,
      role,
      token,
      invitedBy: adminId,
      expiresAt,
    })
    .returning();

  return NextResponse.json(
    { invitation: { ...invitation, url: inviteUrl(token) } },
    { status: 201 }
  );
}
