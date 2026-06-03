export const ADMIN_ROLE = "admin" as const;
export const VISITOR_ROLE = "visitor" as const;

export type KpUserRole = typeof ADMIN_ROLE | typeof VISITOR_ROLE;

export function isKpUserRole(value: unknown): value is KpUserRole {
  return value === ADMIN_ROLE || value === VISITOR_ROLE;
}

/** Role from Clerk user publicMetadata (Dashboard or Backend API). */
export function getUserRoleFromMetadata(
  metadata: Record<string, unknown> | null | undefined
): KpUserRole | undefined {
  const role = metadata?.role;
  return isKpUserRole(role) ? role : undefined;
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

export function canAccessAdminRoute(role: KpUserRole | undefined): boolean {
  return role === ADMIN_ROLE;
}

export function canAccessVisitorRoute(role: KpUserRole | undefined): boolean {
  return role === VISITOR_ROLE;
}
