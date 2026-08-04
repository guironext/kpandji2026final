import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
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

/** Session JWT + Clerk publicMetadata (no database). Prefers metadata over JWT. */
export async function resolveMembershipFromClerk(
  userId: string,
  sessionClaims?: Record<string, unknown> | null
): Promise<Membership> {
  const fromJwt = {
    role: getUserRoleFromSessionClaims(sessionClaims),
    status: getApprovalStatusFromSessionClaims(sessionClaims),
  };

  try {
    const clerkUser = await (await clerkClient()).users.getUser(userId);
    const metadata = clerkUser.publicMetadata as Record<string, unknown>;
    const fromMeta = {
      role: getUserRoleFromMetadata(metadata),
      status: getApprovalStatusFromMetadata(metadata),
    };

    return {
      role: fromMeta.role ?? fromJwt.role,
      status: fromMeta.status ?? fromJwt.status,
    };
  } catch {
    return fromJwt;
  }
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

  const member = await prisma.user.findFirst({
    where: { clerkUserId: userId },
  });
  if (!member) return fromClerk;

  const role = prismaRoleToKp(member.role) ?? fromClerk.role;
  const status = prismaStatusToApproval(member.status) ?? fromClerk.status;

  if (fromClerk.role !== role || fromClerk.status !== status) {
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
