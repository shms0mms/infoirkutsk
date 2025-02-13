CREATE TABLE IF NOT EXISTS "infoirkutsk_document" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"link" text NOT NULL,
	"published_at" timestamp NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"database_id" varchar(255) NOT NULL,
	"updated_at" timestamp with time zone,
	"user_id" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "infoirkutsk_notification" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"database_id" varchar(255) NOT NULL,
	"link" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_document" ADD CONSTRAINT "infoirkutsk_document_database_id_infoirkutsk_database_id_fk" FOREIGN KEY ("database_id") REFERENCES "public"."infoirkutsk_database"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_notification" ADD CONSTRAINT "infoirkutsk_notification_database_id_infoirkutsk_database_id_fk" FOREIGN KEY ("database_id") REFERENCES "public"."infoirkutsk_database"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
