import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db, users, UserStatus } from "@/lib/db";
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

  const members = await db.query.users.findMany({
    where: status ? eq(users.status, status) : undefined,
    orderBy: desc(users.createdAt),
    limit: 200,
  });

  return NextResponse.json({ users: members });
}
