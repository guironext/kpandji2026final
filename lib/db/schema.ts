import { randomUUID } from "node:crypto";
import { index, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

/** Roles a member of the KPANDJI private space can hold. */
export const UserRole = {
  ADMIN: "ADMIN",
  PRESTIGE_USER: "PRESTIGE_USER",
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

/** Lifecycle of a member account after they accept an invitation. */
export const UserStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

/** Lifecycle of an invitation link issued by an admin. */
export const InvitationStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REVOKED: "REVOKED",
  EXPIRED: "EXPIRED",
} as const;
export type InvitationStatus =
  (typeof InvitationStatus)[keyof typeof InvitationStatus];

export const userRoleEnum = pgEnum("UserRole", ["ADMIN", "PRESTIGE_USER"]);
export const userStatusEnum = pgEnum("UserStatus", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const invitationStatusEnum = pgEnum("InvitationStatus", [
  "PENDING",
  "ACCEPTED",
  "REVOKED",
  "EXPIRED",
]);

/** An invitation link an admin sends before anyone can sign up. */
export const invitations = pgTable(
  "Invitation",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    email: text("email").notNull(),
    role: userRoleEnum("role")
      .notNull()
      .$defaultFn(() => "PRESTIGE_USER"),
    token: text("token").notNull().unique(),
    status: invitationStatusEnum("status")
      .notNull()
      .$defaultFn(() => "PENDING"),
    invitedBy: text("invitedBy").notNull(),
    acceptedAt: timestamp("acceptedAt", { mode: "date", precision: 3 }),
    expiresAt: timestamp("expiresAt", { mode: "date", precision: 3 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("Invitation_email_idx").on(table.email),
    index("Invitation_status_idx").on(table.status),
  ]
);

/**
 * A KPANDJI member. Mirrors the Clerk identity and holds the
 * approval state that gates access to the prestige area.
 */
export const users = pgTable(
  "User",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    clerkUserId: text("clerkUserId").notNull().unique(),
    email: text("email").notNull().unique(),
    fullName: text("fullName"),
    role: userRoleEnum("role")
      .notNull()
      .$defaultFn(() => "PRESTIGE_USER"),
    status: userStatusEnum("status")
      .notNull()
      .$defaultFn(() => "PENDING"),
    invitationId: text("invitationId")
      .unique()
      .references(() => invitations.id),
    approvedAt: timestamp("approvedAt", { mode: "date", precision: 3 }),
    approvedBy: text("approvedBy"),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => [index("User_status_idx").on(table.status)]
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
