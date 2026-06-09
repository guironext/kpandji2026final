CREATE TABLE "VisitorMessage" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"createdAt" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE INDEX "VisitorMessage_email_idx" ON "VisitorMessage" USING btree ("email");--> statement-breakpoint
CREATE INDEX "VisitorMessage_createdAt_idx" ON "VisitorMessage" USING btree ("createdAt");