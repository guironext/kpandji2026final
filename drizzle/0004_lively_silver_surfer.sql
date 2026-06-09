CREATE TABLE "PrivilegeContact" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"country" text NOT NULL,
	"city" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"createdAt" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE INDEX "PrivilegeContact_email_idx" ON "PrivilegeContact" USING btree ("email");--> statement-breakpoint
CREATE INDEX "PrivilegeContact_createdAt_idx" ON "PrivilegeContact" USING btree ("createdAt");