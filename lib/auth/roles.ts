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
  return normalizeKpUserRole(value) !== undefined;
}

export function isKpApprovalStatus(value: unknown): value is KpApprovalStatus {
  return normalizeKpApprovalStatus(value) !== undefined;
}

/** Accept Clerk metadata (`prestige-user`) and DB enum (`PRESTIGE_USER`) values. */
export function normalizeKpUserRole(value: unknown): KpUserRole | undefined {
  if (value === ADMIN_ROLE || value === "ADMIN" || value === "admin") {
    return ADMIN_ROLE;
  }
  if (
    value === PRESTIGE_USER_ROLE ||
    value === "PRESTIGE_USER" ||
    value === "prestige_user"
  ) {
    return PRESTIGE_USER_ROLE;
  }
  return undefined;
}

export function normalizeKpApprovalStatus(
  value: unknown
): KpApprovalStatus | undefined {
  if (value === APPROVAL_PENDING || value === "PENDING" || value === "pending") {
    return APPROVAL_PENDING;
  }
  if (value === APPROVAL_APPROVED || value === "APPROVED" || value === "approved") {
    return APPROVAL_APPROVED;
  }
  if (value === APPROVAL_REJECTED || value === "REJECTED" || value === "rejected") {
    return APPROVAL_REJECTED;
  }
  return undefined;
}

/** Role from Clerk user publicMetadata (Dashboard or Backend API). */
export function getUserRoleFromMetadata(
  metadata: Record<string, unknown> | null | undefined
): KpUserRole | undefined {
  return normalizeKpUserRole(metadata?.role);
}

/** Approval status from Clerk user publicMetadata. */
export function getApprovalStatusFromMetadata(
  metadata: Record<string, unknown> | null | undefined
): KpApprovalStatus | undefined {
  return normalizeKpApprovalStatus(metadata?.approvalStatus);
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
  const fromMeta = normalizeKpUserRole(metadata?.role);
  if (fromMeta) return fromMeta;

  const publicMetadata = sessionClaims.publicMetadata as { role?: unknown } | undefined;
  const fromPublic = normalizeKpUserRole(publicMetadata?.role);
  if (fromPublic) return fromPublic;

  return getUserRoleFromMetadata(sessionClaims as Record<string, unknown>);
}

/** Approval status from JWT session claims. */
export function getApprovalStatusFromSessionClaims(
  sessionClaims: Record<string, unknown> | null | undefined
): KpApprovalStatus | undefined {
  if (!sessionClaims) return undefined;

  const metadata = sessionClaims.metadata as { approvalStatus?: unknown } | undefined;
  const fromMeta = normalizeKpApprovalStatus(metadata?.approvalStatus);
  if (fromMeta) return fromMeta;

  const publicMetadata = sessionClaims.publicMetadata as
    | { approvalStatus?: unknown }
    | undefined;
  const fromPublic = normalizeKpApprovalStatus(publicMetadata?.approvalStatus);
  if (fromPublic) return fromPublic;

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

/** Client prestige layout: approved members with the PRESTIGE_USER role only. */
export function canAccessClientPrestigeRoute(
  role: KpUserRole | undefined,
  status: KpApprovalStatus | undefined
): boolean {
  return role === PRESTIGE_USER_ROLE && status === APPROVAL_APPROVED;
}
