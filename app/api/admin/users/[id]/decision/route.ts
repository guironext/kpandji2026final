import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, users, UserStatus } from "@/lib/db";
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

  const member = await db.query.users.findFirst({ where: eq(users.id, id) });
  if (!member) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const approve = body.decision === "approve";
  const nextStatus = approve ? UserStatus.APPROVED : UserStatus.REJECTED;

  const [updated] = await db
    .update(users)
    .set({
      status: nextStatus,
      approvedAt: approve ? new Date() : null,
      approvedBy: approve ? adminId : null,
    })
    .where(eq(users.id, id))
    .returning();

  await syncClerkMembership(updated.clerkUserId, updated.role, updated.status);

  return NextResponse.json({ user: updated });
}
