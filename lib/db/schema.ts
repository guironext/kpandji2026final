import { randomUUID } from "node:crypto";
import {
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

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
    phone: text("phone"),
    residenceCountry: text("residenceCountry"),
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

/** A public test-drive request submitted from the essai page. */
export const essaiRequests = pgTable(
  "EssaiRequest",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    modelIds: jsonb("modelIds").$type<string[]>().notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    preferredDate: text("preferredDate"),
    timeSlot: text("timeSlot"),
    message: text("message"),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("EssaiRequest_email_idx").on(table.email),
    index("EssaiRequest_createdAt_idx").on(table.createdAt),
  ]
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type EssaiRequest = typeof essaiRequests.$inferSelect;
export type NewEssaiRequest = typeof essaiRequests.$inferInsert;

/** A contact message submitted from the public contact page. */
export const visitorMessages = pgTable(
  "VisitorMessage",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    subject: text("subject").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("VisitorMessage_email_idx").on(table.email),
    index("VisitorMessage_createdAt_idx").on(table.createdAt),
  ]
);

export type VisitorMessage = typeof visitorMessages.$inferSelect;
export type NewVisitorMessage = typeof visitorMessages.$inferInsert;

/** An email address captured from a public visitor signup. */
export const visitorEmails = pgTable(
  "VisitorEmail",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    email: text("email").notNull(),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("VisitorEmail_email_idx").on(table.email),
    index("VisitorEmail_createdAt_idx").on(table.createdAt),
  ]
);

export type VisitorEmail = typeof visitorEmails.$inferSelect;
export type NewVisitorEmail = typeof visitorEmails.$inferInsert;

/** A contact request submitted from the public privilege / prestige page. */
export const privilegeContacts = pgTable(
  "PrivilegeContact",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    name: text("name").notNull(),
    country: text("country").notNull(),
    city: text("city").notNull(),
    phone: text("phone").notNull(),
    email: text("email").notNull(),
    createdAt: timestamp("createdAt", { mode: "date", precision: 3 })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("PrivilegeContact_email_idx").on(table.email),
    index("PrivilegeContact_createdAt_idx").on(table.createdAt),
  ]
);

export type PrivilegeContact = typeof privilegeContacts.$inferSelect;
export type NewPrivilegeContact = typeof privilegeContacts.$inferInsert;
