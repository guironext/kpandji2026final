import { NextResponse } from "next/server";
import { requireAdminUserId } from "@/lib/auth/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

/** Admin deletes a contact message. */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminId = await requireAdminUserId();
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const existing = await prisma.message_Contact.findFirst({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  await prisma.message_Contact.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
