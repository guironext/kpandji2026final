import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  canAccessAdminRoute,
  canAccessVisitorRoute,
  getUserRoleFromSessionClaims,
} from "@/lib/auth/roles";



const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isVisitorRoute = createRouteMatcher(["/visitor(.*)"]);

function redirectToClientLogin(request: Request, returnTo: string) {
  const url = new URL("/", request.url);
  url.searchParams.set("clientLogin", "1");
  url.searchParams.set("returnTo", returnTo);
  return NextResponse.redirect(url);
}

export default clerkMiddleware(async (auth, req) => {
  if (!isAdminRoute(req) && !isVisitorRoute(req)) return;

  const { userId, sessionClaims } = await auth();
  const pathname = req.nextUrl.pathname;
  const role = getUserRoleFromSessionClaims(
    sessionClaims as Record<string, unknown> | null | undefined
  );

  if (!userId) {
    return redirectToClientLogin(req, pathname);
  }

  if (isAdminRoute(req) && !canAccessAdminRoute(role)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (isVisitorRoute(req) && !canAccessVisitorRoute(role)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
