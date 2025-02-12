CREATE TABLE IF NOT EXISTS "infoirkutsk_account" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"account_id" varchar(255) NOT NULL,
	"provider_id" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" varchar(255),
	"password" varchar(255),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "infoirkutsk_block" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"order" integer NOT NULL,
	"content" jsonb NOT NULL,
	"project_id" varchar(255) NOT NULL,
	"note_id" varchar(255) NOT NULL,
	"database_id" varchar(255),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "infoirkutsk_database" (
	"id" varchar(255) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "infoirkutsk_folder" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"emoji" varchar(255),
	"folder_id" varchar(255),
	"project_id" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "infoirkutsk_notes" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"emoji" varchar(255),
	"private" boolean NOT NULL,
	"is_pinned" boolean DEFAULT false NOT NULL,
	"folder_id" varchar(255),
	"project_id" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "infoirkutsk_project_membership" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"role" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"project_id" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "infoirkutsk_project" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"icon" varchar(255),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "infoirkutsk_session" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"ip_address" varchar(255),
	"user_agent" varchar(255),
	"user_id" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "infoirkutsk_session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "infoirkutsk_sub_task" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"status" varchar(255) NOT NULL,
	"dead_line_date" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"task_id" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "infoirkutsk_task" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"status" varchar(255) NOT NULL,
	"dead_line_date" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"database_id" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "infoirkutsk_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"image" varchar(255),
	"customer_id" varchar(255),
	"subscription_id" varchar(255),
	"plan" varchar(255) DEFAULT 'Free' NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone,
	CONSTRAINT "infoirkutsk_user_customer_id_unique" UNIQUE("customer_id"),
	CONSTRAINT "infoirkutsk_user_subscription_id_unique" UNIQUE("subscription_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "infoirkutsk_verification" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"identifier" varchar(255) NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_account" ADD CONSTRAINT "infoirkutsk_account_user_id_infoirkutsk_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."infoirkutsk_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_block" ADD CONSTRAINT "infoirkutsk_block_project_id_infoirkutsk_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."infoirkutsk_project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_block" ADD CONSTRAINT "infoirkutsk_block_note_id_infoirkutsk_notes_id_fk" FOREIGN KEY ("note_id") REFERENCES "public"."infoirkutsk_notes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_block" ADD CONSTRAINT "infoirkutsk_block_database_id_infoirkutsk_database_id_fk" FOREIGN KEY ("database_id") REFERENCES "public"."infoirkutsk_database"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_folder" ADD CONSTRAINT "infoirkutsk_folder_folder_id_infoirkutsk_folder_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."infoirkutsk_folder"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_folder" ADD CONSTRAINT "infoirkutsk_folder_project_id_infoirkutsk_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."infoirkutsk_project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_notes" ADD CONSTRAINT "infoirkutsk_notes_folder_id_infoirkutsk_folder_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."infoirkutsk_folder"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_notes" ADD CONSTRAINT "infoirkutsk_notes_project_id_infoirkutsk_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."infoirkutsk_project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_notes" ADD CONSTRAINT "infoirkutsk_notes_user_id_infoirkutsk_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."infoirkutsk_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_project_membership" ADD CONSTRAINT "infoirkutsk_project_membership_user_id_infoirkutsk_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."infoirkutsk_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_project_membership" ADD CONSTRAINT "infoirkutsk_project_membership_project_id_infoirkutsk_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."infoirkutsk_project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_session" ADD CONSTRAINT "infoirkutsk_session_user_id_infoirkutsk_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."infoirkutsk_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_sub_task" ADD CONSTRAINT "infoirkutsk_sub_task_task_id_infoirkutsk_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."infoirkutsk_task"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_task" ADD CONSTRAINT "infoirkutsk_task_database_id_infoirkutsk_database_id_fk" FOREIGN KEY ("database_id") REFERENCES "public"."infoirkutsk_database"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
