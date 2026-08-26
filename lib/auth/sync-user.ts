import { clerkClient } from "@clerk/nextjs/server";
import { InvitationStatus, prisma, UserRole } from "@/lib/db";
import { syncClerkMembership } from "@/lib/auth/server";

/** Mirrors Clerk identity into Prisma (same persistence pattern as public form APIs). */
export async function syncClerkUserToDatabase(clerkUserId: string) {
  const cc = await clerkClient();
  const clerkUser = await cc.users.getUser(clerkUserId);

  const email =
    clerkUser.primaryEmailAddress?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress ??
    "";

  const fullName =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;

  const unsafeMetadata = clerkUser.unsafeMetadata as
    | Record<string, unknown>
    | undefined;
  const invitedByUserId = unsafeMetadata?.invitedByUserId as string | undefined;
  const invitationToken = unsafeMetadata?.invitationToken as string | undefined;

  const profileData = {
    email,
    fullName,
    ...(invitedByUserId ? { invitationId: invitedByUserId } : {}),
  };

  let user =
    (await prisma.user.findUnique({ where: { clerkUserId } })) ??
    (email
      ? await prisma.user.findUnique({ where: { email } })
      : null);

  if (user) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        clerkUserId,
        ...profileData,
      },
    });
  } else {
    user = await prisma.user.create({
      data: {
        clerkUserId,
        ...profileData,
        role: UserRole.CLIENT_USER,
        invitationId: invitedByUserId ?? null,
      },
    });
  }

  await syncClerkMembership(user.clerkUserId, user.role, user.status);

  if (invitationToken) {
    const invitation = await prisma.invitation.findFirst({
      where: { token: invitationToken },
      select: { id: true, status: true },
    });

    if (
      invitation &&
      (invitation.status === InvitationStatus.PENDING ||
        invitation.status === InvitationStatus.ACCEPTED)
    ) {
      await prisma.invitation.update({
        where: { id: invitation.id },
        data: {
          status: InvitationStatus.ACCEPTED,
          acceptedAt: new Date(),
        },
      });

      if (!user.invitationId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { invitationId: invitation.id },
        });
      }
    }
  }

  return user;
}
