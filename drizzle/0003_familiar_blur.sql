CREATE TABLE "VisitorEmail" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"createdAt" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE INDEX "VisitorEmail_email_idx" ON "VisitorEmail" USING btree ("email");--> statement-breakpoint
CREATE INDEX "VisitorEmail_createdAt_idx" ON "VisitorEmail" USING btree ("createdAt");