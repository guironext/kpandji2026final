import { NextResponse } from "next/server";
import { UserStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { requireAdminUserId } from "@/lib/auth/server";

export const runtime = "nodejs";

function parseStatus(value: string | null): UserStatus | undefined {
  if (value === "PENDING") return UserStatus.PENDING;
  if (value === "APPROVED") return UserStatus.APPROVED;
  if (value === "REJECTED") return UserStatus.REJECTED;
  return undefined;
}

export async function GET(request: Request) {
  const adminId = await requireAdminUserId();
  if (!adminId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const status = parseStatus(new URL(request.url).searchParams.get("status"));

  const users = await prisma.user.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return NextResponse.json({ users });
}
