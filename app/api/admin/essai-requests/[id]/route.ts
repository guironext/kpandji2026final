import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { requireAdminUserId } from "@/lib/auth/server";
import { db, essaiRequests } from "@/lib/db";

export const runtime = "nodejs";

/** Admin deletes a test-drive request. */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminId = await requireAdminUserId();
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const existing = await db.query.essaiRequests.findFirst({
    where: eq(essaiRequests.id, id),
    columns: { id: true },
  });

  if (!existing) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  await db.delete(essaiRequests).where(eq(essaiRequests.id, id));

  return NextResponse.json({ ok: true });
}
