CREATE TABLE "EssaiRequest" (
	"id" text PRIMARY KEY NOT NULL,
	"modelIds" jsonb NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"preferredDate" text,
	"timeSlot" text,
	"message" text,
	"createdAt" timestamp (3) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "residenceCountry" text;--> statement-breakpoint
CREATE INDEX "EssaiRequest_email_idx" ON "EssaiRequest" USING btree ("email");--> statement-breakpoint
CREATE INDEX "EssaiRequest_createdAt_idx" ON "EssaiRequest" USING btree ("createdAt");