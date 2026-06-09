import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db, invitations, users, InvitationStatus, UserRole } from "@/lib/db";
import { syncClerkMembership } from "@/lib/auth/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const email = email_addresses?.[0]?.email_address ?? "";

    const unsafeMetadata = evt.data.unsafe_metadata as Record<string, unknown> | undefined;

    const invitedByUserId = unsafeMetadata?.invitedByUserId as string | undefined;

    const fullName =
      [first_name, last_name].filter(Boolean).join(" ") || null;

    const [newUser] = await db
      .insert(users)
      .values({
        clerkUserId: id,
        email,
        fullName,
        role: UserRole.PRESTIGE_USER,
        invitationId: invitedByUserId ?? null,
      })
      .onConflictDoUpdate({
        target: users.clerkUserId,
        set: {
          email,
          fullName,
          ...(invitedByUserId && { invitationId: invitedByUserId }),
        },
      })
      .returning();

    await syncClerkMembership(newUser.clerkUserId, newUser.role, newUser.status);

    // Mark invitation link as used if created via invite
    const invitationToken = unsafeMetadata?.invitationToken as string | undefined;
    if (invitationToken && newUser.invitationId) {
      await db
        .update(invitations)
        .set({ status: InvitationStatus.ACCEPTED, acceptedAt: new Date() })
        .where(eq(invitations.token, invitationToken));
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const email = email_addresses?.[0]?.email_address ?? "";

    const unsafeMetadata = evt.data.unsafe_metadata as Record<string, unknown> | undefined;
    const invitedByUserId = unsafeMetadata?.invitedByUserId as string | undefined;

    const fullName =
      [first_name, last_name].filter(Boolean).join(" ") || null;

    const [upserted] = await db
      .insert(users)
      .values({
        clerkUserId: id,
        email,
        fullName,
        role: UserRole.PRESTIGE_USER,
        invitationId: invitedByUserId ?? null,
      })
      .onConflictDoUpdate({
        target: users.clerkUserId,
        set: {
          email,
          fullName,
          ...(invitedByUserId && { invitationId: invitedByUserId }),
        },
      })
      .returning();

    await syncClerkMembership(upserted.clerkUserId, upserted.role, upserted.status);

    // Mark invitation link as used if present (handles user.updated before user.created)
    const invitationToken = unsafeMetadata?.invitationToken as string | undefined;
    if (invitationToken && invitedByUserId) {
      await db
        .update(invitations)
        .set({ status: InvitationStatus.ACCEPTED, acceptedAt: new Date() })
        .where(eq(invitations.token, invitationToken));
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    if (id) {
      await db.delete(users).where(eq(users.clerkUserId, id));
    }
  }

  return new Response("OK", { status: 200 });
}
