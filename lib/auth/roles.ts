export const ADMIN_ROLE = "admin" as const;
export const PRESTIGE_USER_ROLE = "prestige-user" as const;

export type KpUserRole = typeof ADMIN_ROLE | typeof PRESTIGE_USER_ROLE;

export const APPROVAL_PENDING = "pending" as const;
export const APPROVAL_APPROVED = "approved" as const;
export const APPROVAL_REJECTED = "rejected" as const;

export type KpApprovalStatus =
  | typeof APPROVAL_PENDING
  | typeof APPROVAL_APPROVED
  | typeof APPROVAL_REJECTED;

export function isKpUserRole(value: unknown): value is KpUserRole {
  return value === ADMIN_ROLE || value === PRESTIGE_USER_ROLE;
}

export function isKpApprovalStatus(value: unknown): value is KpApprovalStatus {
  return (
    value === APPROVAL_PENDING ||
    value === APPROVAL_APPROVED ||
    value === APPROVAL_REJECTED
  );
}

/** Role from Clerk user publicMetadata (Dashboard or Backend API). */
export function getUserRoleFromMetadata(
  metadata: Record<string, unknown> | null | undefined
): KpUserRole | undefined {
  const role = metadata?.role;
  return isKpUserRole(role) ? role : undefined;
}

/** Approval status from Clerk user publicMetadata. */
export function getApprovalStatusFromMetadata(
  metadata: Record<string, unknown> | null | undefined
): KpApprovalStatus | undefined {
  const status = metadata?.approvalStatus;
  return isKpApprovalStatus(status) ? status : undefined;
}

/**
 * Role from JWT session claims.
 * In Clerk Dashboard → Sessions → Customize session token, add:
 * { "metadata": { "role": "{{user.public_metadata.role}}" } }
 */
export function getUserRoleFromSessionClaims(
  sessionClaims: Record<string, unknown> | null | undefined
): KpUserRole | undefined {
  if (!sessionClaims) return undefined;

  const metadata = sessionClaims.metadata as { role?: unknown } | undefined;
  if (isKpUserRole(metadata?.role)) return metadata.role;

  const publicMetadata = sessionClaims.publicMetadata as { role?: unknown } | undefined;
  if (isKpUserRole(publicMetadata?.role)) return publicMetadata.role;

  return getUserRoleFromMetadata(sessionClaims as Record<string, unknown>);
}

/** Approval status from JWT session claims. */
export function getApprovalStatusFromSessionClaims(
  sessionClaims: Record<string, unknown> | null | undefined
): KpApprovalStatus | undefined {
  if (!sessionClaims) return undefined;

  const metadata = sessionClaims.metadata as { approvalStatus?: unknown } | undefined;
  if (isKpApprovalStatus(metadata?.approvalStatus)) return metadata.approvalStatus;

  const publicMetadata = sessionClaims.publicMetadata as
    | { approvalStatus?: unknown }
    | undefined;
  if (isKpApprovalStatus(publicMetadata?.approvalStatus)) {
    return publicMetadata.approvalStatus;
  }

  return getApprovalStatusFromMetadata(sessionClaims as Record<string, unknown>);
}

export function canAccessAdminRoute(role: KpUserRole | undefined): boolean {
  return role === ADMIN_ROLE;
}

/** A prestige member can enter their space only once an admin approved them. */
export function canAccessPrestigeRoute(
  role: KpUserRole | undefined,
  status: KpApprovalStatus | undefined
): boolean {
  if (role === ADMIN_ROLE) return true;
  return role === PRESTIGE_USER_ROLE && status === APPROVAL_APPROVED;
}
