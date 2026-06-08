CREATE TYPE "public"."InvitationStatus" AS ENUM('PENDING', 'ACCEPTED', 'REVOKED', 'EXPIRED');--> statement-breakpoint
CREATE TYPE "public"."UserRole" AS ENUM('ADMIN', 'PRESTIGE_USER');--> statement-breakpoint
CREATE TYPE "public"."UserStatus" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TABLE "Invitation" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"role" "UserRole" NOT NULL,
	"token" text NOT NULL,
	"status" "InvitationStatus" NOT NULL,
	"invitedBy" text NOT NULL,
	"acceptedAt" timestamp (3),
	"expiresAt" timestamp (3) NOT NULL,
	"createdAt" timestamp (3) NOT NULL,
	CONSTRAINT "Invitation_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" text PRIMARY KEY NOT NULL,
	"clerkUserId" text NOT NULL,
	"email" text NOT NULL,
	"fullName" text,
	"role" "UserRole" NOT NULL,
	"status" "UserStatus" NOT NULL,
	"invitationId" text,
	"approvedAt" timestamp (3),
	"approvedBy" text,
	"createdAt" timestamp (3) NOT NULL,
	"updatedAt" timestamp (3) NOT NULL,
	CONSTRAINT "User_clerkUserId_unique" UNIQUE("clerkUserId"),
	CONSTRAINT "User_email_unique" UNIQUE("email"),
	CONSTRAINT "User_invitationId_unique" UNIQUE("invitationId")
);
--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_invitationId_Invitation_id_fk" FOREIGN KEY ("invitationId") REFERENCES "public"."Invitation"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "Invitation_email_idx" ON "Invitation" USING btree ("email");--> statement-breakpoint
CREATE INDEX "Invitation_status_idx" ON "Invitation" USING btree ("status");--> statement-breakpoint
CREATE INDEX "User_status_idx" ON "User" USING btree ("status");