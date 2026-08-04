import { auth, clerkClient } from "@clerk/nextjs/server";
import { UserRole, UserStatus } from "@/lib/db";
import {
  ADMIN_ROLE,
  APPROVAL_APPROVED,
  APPROVAL_PENDING,
  APPROVAL_REJECTED,
  PRESTIGE_USER_ROLE,
  getUserRoleFromMetadata,
  type KpApprovalStatus,
  type KpUserRole,
} from "@/lib/auth/roles";

/** Map the Prisma role enum to the string stored in Clerk metadata. */
export function prismaRoleToKp(role: UserRole): KpUserRole {
  return role === UserRole.ADMIN ? ADMIN_ROLE : PRESTIGE_USER_ROLE;
}

/** Map the Prisma status enum to the string stored in Clerk metadata. */
export function prismaStatusToApproval(status: UserStatus): KpApprovalStatus {
  switch (status) {
    case UserStatus.APPROVED:
      return APPROVAL_APPROVED;
    case UserStatus.REJECTED:
      return APPROVAL_REJECTED;
    default:
      return APPROVAL_PENDING;
  }
}

/** Returns the signed-in Clerk user id only if they are an admin, else null. */
export async function requireAdminUserId(): Promise<string | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const cc = await clerkClient();
  const user = await cc.users.getUser(userId);
  const role = getUserRoleFromMetadata(
    user.publicMetadata as Record<string, unknown>
  );
  return role === ADMIN_ROLE ? userId : null;
}

/**
 * Push role + approval status into Clerk publicMetadata so the middleware,
 * server components, and session claims all see a single source of truth.
 */
export async function syncClerkMembership(
  clerkUserId: string,
  role: UserRole,
  status: UserStatus
): Promise<void> {
  const cc = await clerkClient();
  await cc.users.updateUserMetadata(clerkUserId, {
    publicMetadata: {
      role: prismaRoleToKp(role),
      approvalStatus: prismaStatusToApproval(status),
    },
  });
}
