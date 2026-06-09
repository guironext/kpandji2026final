import { NextResponse } from "next/server";
import { InvitationStatus, prisma } from "@/lib/db";

export const runtime = "nodejs";

/** Public: lets the sign-up page confirm a token and prefill the email. */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) {
    return NextResponse.json({ valid: false, reason: "missing" }, { status: 400 });
  }

  const invitation = await prisma.invitation.findFirst({
    where: { token },
  });

  if (!invitation || invitation.status === InvitationStatus.REVOKED) {
    return NextResponse.json({ valid: false, reason: "invalid" }, { status: 404 });
  }

  if (invitation.status === InvitationStatus.ACCEPTED) {
    return NextResponse.json({ valid: false, reason: "used" }, { status: 410 });
  }

  if (invitation.expiresAt.getTime() < Date.now()) {
    return NextResponse.json({ valid: false, reason: "expired" }, { status: 410 });
  }

  return NextResponse.json({ valid: true, email: invitation.email });
}
