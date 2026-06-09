import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { requireAdminUserId } from "@/lib/auth/server";
import { db, visitorMessages } from "@/lib/db";

export const runtime = "nodejs";

/** Admin deletes a visitor contact message. */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminId = await requireAdminUserId();
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const existing = await db.query.visitorMessages.findFirst({
    where: eq(visitorMessages.id, id),
    columns: { id: true },
  });

  if (!existing) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  await db.delete(visitorMessages).where(eq(visitorMessages.id, id));

  return NextResponse.json({ ok: true });
}
