import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  canAccessAdminRoute,
  canAccessPrestigeRoute,
  getApprovalStatusFromSessionClaims,
  getUserRoleFromSessionClaims,
} from "@/lib/auth/roles";



const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isPrestigeRoute = createRouteMatcher(["/client-prestige(.*)"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);

function redirectToClientLogin(request: Request, returnTo: string) {
  const url = new URL("/", request.url);
  url.searchParams.set("clientLogin", "1");
  url.searchParams.set("returnTo", returnTo);
  return NextResponse.redirect(url);
}

export default clerkMiddleware(async (auth, req) => {
  const protectedRoute =
    isAdminRoute(req) || isPrestigeRoute(req) || isOnboardingRoute(req);
  if (!protectedRoute) return;

  const { userId, sessionClaims } = await auth();
  const pathname = req.nextUrl.pathname;

  if (!userId) {
    return redirectToClientLogin(req, pathname);
  }

  const claims = sessionClaims as Record<string, unknown> | null | undefined;
  const role = getUserRoleFromSessionClaims(claims);
  const status = getApprovalStatusFromSessionClaims(claims);

  // The onboarding waiting room only requires authentication.
  if (isOnboardingRoute(req)) return;

  if (isAdminRoute(req) && !canAccessAdminRoute(role)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (isPrestigeRoute(req) && !canAccessPrestigeRoute(role, status)) {
    // Not yet approved → waiting room; otherwise the page itself refuses.
    if (status !== "approved" && status !== "rejected") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
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
