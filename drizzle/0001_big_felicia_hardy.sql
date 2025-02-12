CREATE TABLE IF NOT EXISTS "infoirkutsk_material" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"status" varchar(255) NOT NULL,
	"database_id" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DROP TABLE "infoirkutsk_block";--> statement-breakpoint
DROP TABLE "infoirkutsk_folder";--> statement-breakpoint
DROP TABLE "infoirkutsk_notes";--> statement-breakpoint
DROP TABLE "infoirkutsk_project_membership";--> statement-breakpoint
DROP TABLE "infoirkutsk_project";--> statement-breakpoint
DROP TABLE "infoirkutsk_sub_task";--> statement-breakpoint
DROP TABLE "infoirkutsk_task";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_material" ADD CONSTRAINT "infoirkutsk_material_database_id_infoirkutsk_database_id_fk" FOREIGN KEY ("database_id") REFERENCES "public"."infoirkutsk_database"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "infoirkutsk_user" DROP COLUMN IF EXISTS "plan";