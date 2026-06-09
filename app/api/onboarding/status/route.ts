import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db, users } from "@/lib/db";
import { prismaRoleToKp, prismaStatusToApproval } from "@/lib/auth/server";

export const runtime = "nodejs";

function needsProfile(member: {
  fullName: string | null;
  phone: string | null;
  residenceCountry: string | null;
}): boolean {
  return (
    !member.fullName?.trim() ||
    !member.phone?.trim() ||
    !member.residenceCountry?.trim()
  );
}

/** Polled by the onboarding page to detect profile state and admin approval. */
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const member = await db.query.users.findFirst({
    where: eq(users.clerkUserId, userId),
  });
  if (!member) {
    return NextResponse.json({ status: null, needsProfile: true });
  }

  return NextResponse.json({
    status: prismaStatusToApproval(member.status),
    role: prismaRoleToKp(member.role),
    fullName: member.fullName,
    phone: member.phone,
    residenceCountry: member.residenceCountry,
    needsProfile: needsProfile(member),
  });
}
