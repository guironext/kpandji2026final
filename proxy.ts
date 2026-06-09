import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  ADMIN_ROLE,
  APPROVAL_APPROVED,
  APPROVAL_PENDING,
  APPROVAL_REJECTED,
  PRESTIGE_USER_ROLE,
  canAccessAdminRoute,
  canAccessPrestigeRoute,
  getApprovalStatusFromSessionClaims,
  getUserRoleFromSessionClaims,
  type KpApprovalStatus,
  type KpUserRole,
} from "@/lib/auth/roles";
import {
  ADMIN_HOME_PATH,
  ONBOARDING_PATH,
  PRESTIGE_HOME_PATH,
} from "@/lib/auth/routes";
import { resolveMembership, resolveMembershipFromClerk } from "@/lib/auth/membership";

const isAdminRoute = createRouteMatcher([`${ADMIN_HOME_PATH}(.*)`]);
const isPrestigeRoute = createRouteMatcher([`${PRESTIGE_HOME_PATH}(.*)`]);
const isOnboardingRoute = createRouteMatcher([`${ONBOARDING_PATH}(.*)`]);
// setup-mfa is a Clerk session task during sign-up; must stay reachable before
// the server sees a fully active session (see completeSignUpFlow → taskUrls).
const isAuthFlowRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/onboarding/setup-mfa",
]);

function shouldRedirectNewMemberToOnboarding(
  role: KpUserRole | undefined,
  status: KpApprovalStatus | undefined
): boolean {
  if (role === ADMIN_ROLE) return false;
  if (status === APPROVAL_APPROVED) return false;
  if (status === APPROVAL_REJECTED) return false;
  return status === undefined || status === APPROVAL_PENDING;
}

function redirectToClientLogin(request: Request, returnTo: string) {
  const url = new URL("/", request.url);
  url.searchParams.set("clientLogin", "1");
  url.searchParams.set("returnTo", returnTo);
  return NextResponse.redirect(url);
}

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const pathname = req.nextUrl.pathname;
  const claims = sessionClaims as Record<string, unknown> | null | undefined;

  let role = getUserRoleFromSessionClaims(claims);
  let status = getApprovalStatusFromSessionClaims(claims);

  if (userId && (!role || !status)) {
    const membership = await resolveMembershipFromClerk(userId, claims);
    role = role ?? membership.role;
    status = status ?? membership.status;
  }

  // Approved prestige members leave the onboarding waiting room for their space.
  if (
    userId &&
    isOnboardingRoute(req) &&
    !pathname.startsWith("/onboarding/setup-mfa")
  ) {
    const membership = await resolveMembership(userId, claims);
    role = membership.role ?? role;
    status = membership.status ?? status;

    if (
      membership.role === PRESTIGE_USER_ROLE &&
      membership.status === APPROVAL_APPROVED
    ) {
      return NextResponse.redirect(new URL(PRESTIGE_HOME_PATH, req.url));
    }
  }

  // New/pending members always land in the onboarding waiting room.
  if (
    userId &&
    !pathname.startsWith("/api") &&
    !isOnboardingRoute(req) &&
    !isAuthFlowRoute(req) &&
    !isPrestigeRoute(req) &&
    shouldRedirectNewMemberToOnboarding(role, status)
  ) {
    const membership = await resolveMembership(userId, claims);
    role = membership.role ?? role;
    status = membership.status ?? status;

    if (shouldRedirectNewMemberToOnboarding(role, status)) {
      const onboardingUrl = new URL(ONBOARDING_PATH, req.url);
      const token = req.nextUrl.searchParams.get("token");
      if (token) onboardingUrl.searchParams.set("token", token);
      return NextResponse.redirect(onboardingUrl);
    }
  }

  // Signed-in admins land on the admin dashboard from default entry routes.
  if (
    userId &&
    role === ADMIN_ROLE &&
    !pathname.startsWith("/api") &&
    !isAdminRoute(req) &&
    !isAuthFlowRoute(req) &&
    (pathname === "/" || isOnboardingRoute(req) || isPrestigeRoute(req))
  ) {
    return NextResponse.redirect(new URL(ADMIN_HOME_PATH, req.url));
  }

  const protectedRoute =
    isAdminRoute(req) || isPrestigeRoute(req) || isOnboardingRoute(req);
  if (!protectedRoute) return;

  if (!userId) {
    return redirectToClientLogin(req, pathname);
  }

  // The onboarding waiting room only requires authentication.
  if (isOnboardingRoute(req)) return;

  if (isAdminRoute(req) && !canAccessAdminRoute(role)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (isPrestigeRoute(req) && !canAccessPrestigeRoute(role, status)) {
    const membership = await resolveMembership(userId!, claims);
    role = membership.role ?? role;
    status = membership.status ?? status;
  }

  if (isPrestigeRoute(req) && !canAccessPrestigeRoute(role, status)) {
    if (status !== APPROVAL_APPROVED && status !== APPROVAL_REJECTED) {
      return NextResponse.redirect(new URL(ONBOARDING_PATH, req.url));
    }
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
