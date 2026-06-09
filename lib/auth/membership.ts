import { clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db, users } from "@/lib/db";
import {
  prismaRoleToKp,
  prismaStatusToApproval,
  syncClerkMembership,
} from "@/lib/auth/server";
import {
  getApprovalStatusFromMetadata,
  getApprovalStatusFromSessionClaims,
  getUserRoleFromMetadata,
  getUserRoleFromSessionClaims,
  normalizeKpApprovalStatus,
  normalizeKpUserRole,
  type KpApprovalStatus,
  type KpUserRole,
} from "@/lib/auth/roles";

export type Membership = {
  role: KpUserRole | undefined;
  status: KpApprovalStatus | undefined;
};

/** Fast path: session JWT + Clerk publicMetadata (no database). */
export async function resolveMembershipFromClerk(
  userId: string,
  sessionClaims?: Record<string, unknown> | null
): Promise<Membership> {
  let role = getUserRoleFromSessionClaims(sessionClaims);
  let status = getApprovalStatusFromSessionClaims(sessionClaims);

  if (role && status) return { role, status };

  const clerkUser = await (await clerkClient()).users.getUser(userId);
  const metadata = clerkUser.publicMetadata as Record<string, unknown>;

  return {
    role: role ?? getUserRoleFromMetadata(metadata),
    status: status ?? getApprovalStatusFromMetadata(metadata),
  };
}

/**
 * Authoritative membership for server routes: JWT → Clerk metadata → database.
 * Back-fills Clerk publicMetadata when the DB row is ahead of the session.
 */
export async function resolveMembership(
  userId: string,
  sessionClaims?: Record<string, unknown> | null
): Promise<Membership> {
  const fromClerk = await resolveMembershipFromClerk(userId, sessionClaims);
  if (fromClerk.role && fromClerk.status) return fromClerk;

  const member = await db.query.users.findFirst({
    where: eq(users.clerkUserId, userId),
  });
  if (!member) return fromClerk;

  const role = fromClerk.role ?? prismaRoleToKp(member.role);
  const status = fromClerk.status ?? prismaStatusToApproval(member.status);

  if (!fromClerk.role || !fromClerk.status) {
    await syncClerkMembership(userId, member.role, member.status);
  }

  return { role, status };
}

/** Normalize raw role/status values from DB exports or legacy metadata. */
export function membershipFromRaw(
  role: unknown,
  status: unknown
): Membership {
  return {
    role: normalizeKpUserRole(role),
    status: normalizeKpApprovalStatus(status),
  };
}
