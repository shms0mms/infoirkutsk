ALTER TABLE "infoirkutsk_document" DROP CONSTRAINT "infoirkutsk_document_database_id_infoirkutsk_database_id_fk";
--> statement-breakpoint
ALTER TABLE "infoirkutsk_material" DROP CONSTRAINT "infoirkutsk_material_database_id_infoirkutsk_database_id_fk";
--> statement-breakpoint
ALTER TABLE "infoirkutsk_document" DROP COLUMN IF EXISTS "database_id";--> statement-breakpoint
ALTER TABLE "infoirkutsk_material" DROP COLUMN IF EXISTS "database_id";