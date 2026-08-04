import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import {
  InvitationStatus,
  prisma,
  UserRole,
} from "@/lib/db";
import { requireAdminUserId } from "@/lib/auth/server";

export const runtime = "nodejs";

const INVITE_TTL_DAYS = 14;

function inviteUrl(token: string): string {
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "";
  const path = `/sign-up?token=${token}`;
  if (!base) return path;
  if (/^https?:\/\//i.test(base)) return `${base}${path}`;
  return `https://${base}${path}`;
}

export async function GET() {
  const adminId = await requireAdminUserId();
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const rows = await prisma.invitation.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
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

  const existingUser = await prisma.user.findFirst({
    where: { email },
  });
  if (existingUser) {
    return NextResponse.json(
      { error: "This email already has an account" },
      { status: 409 }
    );
  }

  await prisma.invitation.updateMany({
    where: {
      email,
      status: InvitationStatus.PENDING,
    },
    data: { status: InvitationStatus.REVOKED },
  });

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + INVITE_TTL_DAYS * 24 * 60 * 60 * 1000);

  const invitation = await prisma.invitation.create({
    data: {
      email,
      role,
      token,
      invitedBy: adminId,
      expiresAt,
    },
  });

  return NextResponse.json(
    { invitation: { ...invitation, url: inviteUrl(token) } },
    { status: 201 }
  );
}
