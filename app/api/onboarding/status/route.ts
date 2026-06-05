import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { prismaRoleToKp, prismaStatusToApproval } from "@/lib/auth/server";

export const runtime = "nodejs";

/** Polled by the onboarding page to detect when the admin grants approval. */
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const member = await prisma.user.findUnique({ where: { clerkUserId: userId } });
  if (!member) {
    return NextResponse.json({ status: null });
  }

  return NextResponse.json({
    status: prismaStatusToApproval(member.status),
    role: prismaRoleToKp(member.role),
  });
}
