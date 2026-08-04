import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { syncClerkUserToDatabase } from "@/lib/auth/sync-user";
import {
  prismaRoleToKp,
  prismaStatusToApproval,
} from "@/lib/auth/server";

export const runtime = "nodejs";

/** Called after sign-in or sign-up to persist the Clerk user in Prisma. */
export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await syncClerkUserToDatabase(userId);
    return NextResponse.json({
      id: user.id,
      status: prismaStatusToApproval(user.status),
      role: prismaRoleToKp(user.role),
    });
  } catch (error) {
    console.error("Auth sync failed:", error);
    return NextResponse.json(
      { error: "Impossible de synchroniser le compte." },
      { status: 500 }
    );
  }
}
