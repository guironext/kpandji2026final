import { NextResponse } from "next/server";
import { prisma, UserStatus } from "@/lib/db";
import { requireAdminUserId, syncClerkMembership } from "@/lib/auth/server";

export const runtime = "nodejs";

/** Admin approves or rejects a pending member. */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminId = await requireAdminUserId();
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  let body: { decision?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.decision !== "approve" && body.decision !== "reject") {
    return NextResponse.json(
      { error: "decision must be 'approve' or 'reject'" },
      { status: 400 }
    );
  }

  const member = await prisma.user.findFirst({ where: { id } });
  if (!member) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (member.status !== UserStatus.PENDING) {
    return NextResponse.json(
      { error: "Ce membre a déjà été traité." },
      { status: 409 }
    );
  }

  const approve = body.decision === "approve";
  const nextStatus = approve ? UserStatus.APPROVED : UserStatus.REJECTED;

  const updated = await prisma.user.update({
    where: { id },
    data: {
      status: nextStatus,
      approvedAt: approve ? new Date() : null,
      approvedBy: approve ? adminId : null,
    },
  });

  try {
    await syncClerkMembership(updated.clerkUserId, updated.role, updated.status);
  } catch (err) {
    console.error("Failed to sync Clerk membership after decision:", err);
    return NextResponse.json(
      { error: "Membre mis à jour en base, mais la synchronisation Clerk a échoué." },
      { status: 502 }
    );
  }

  return NextResponse.json({ user: updated });
}
