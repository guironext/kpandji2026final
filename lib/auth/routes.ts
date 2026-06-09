import {
  ADMIN_ROLE,
  APPROVAL_APPROVED,
  PRESTIGE_USER_ROLE,
  type KpApprovalStatus,
  type KpUserRole,
} from "@/lib/auth/roles";

/** Authenticated member area (served from `app/(users)/…`). */
export const PRESTIGE_HOME_PATH = "/client-prestige";
export const ADMIN_HOME_PATH = "/admin";
export const ONBOARDING_PATH = "/onboarding";

export function homePathForRole(role: KpUserRole | null | undefined): string {
  return role === ADMIN_ROLE ? ADMIN_HOME_PATH : PRESTIGE_HOME_PATH;
}

/** Signed-in header / nav target based on role and approval (matches middleware). */
export function accountHomePathForMember(
  role: KpUserRole | null | undefined,
  status: KpApprovalStatus | null | undefined
): string {
  if (role === ADMIN_ROLE) return ADMIN_HOME_PATH;
  if (role === PRESTIGE_USER_ROLE && status === APPROVAL_APPROVED) {
    return PRESTIGE_HOME_PATH;
  }
  return ONBOARDING_PATH;
}
