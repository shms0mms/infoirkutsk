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
CREATE TABLE IF NOT EXISTS "infoirkutsk_database" (
	"id" varchar(255) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "infoirkutsk_material" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"status" varchar(255) NOT NULL,
	"database_id" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone,
	"user_id" varchar(255) NOT NULL
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
CREATE TABLE IF NOT EXISTS "infoirkutsk_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"image" varchar(255),
	"customer_id" varchar(255),
	"subscription_id" varchar(255),
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
 ALTER TABLE "infoirkutsk_material" ADD CONSTRAINT "infoirkutsk_material_database_id_infoirkutsk_database_id_fk" FOREIGN KEY ("database_id") REFERENCES "public"."infoirkutsk_database"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoirkutsk_session" ADD CONSTRAINT "infoirkutsk_session_user_id_infoirkutsk_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."infoirkutsk_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
