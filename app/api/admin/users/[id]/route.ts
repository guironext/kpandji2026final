import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { requireAdminUserId } from "@/lib/auth/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

/** Admin deletes a member from the database (and Clerk account). */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminClerkId = await requireAdminUserId();
  if (!adminClerkId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const member = await prisma.user.findFirst({
    where: { id },
    select: { id: true, clerkUserId: true },
  });

  if (!member) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (member.clerkUserId === adminClerkId) {
    return NextResponse.json(
      { error: "Vous ne pouvez pas supprimer votre propre compte." },
      { status: 400 }
    );
  }

  await prisma.user.delete({ where: { id: member.id } });

  try {
    const cc = await clerkClient();
    await cc.users.deleteUser(member.clerkUserId);
  } catch (err) {
    console.error("Failed to delete Clerk user after Prisma delete:", err);
    return NextResponse.json(
      {
        error:
          "Membre supprimé de la base, mais la suppression Clerk a échoué.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
