import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_house_churches_language" AS ENUM('english', 'spanish');
  CREATE TYPE "public"."enum_house_churches_status" AS ENUM('active', 'inactive');
  CREATE TABLE IF NOT EXISTS "house_churches" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"location_description" varchar NOT NULL,
  	"facilitator" varchar NOT NULL,
  	"time" varchar NOT NULL,
  	"language" "enum_house_churches_language" DEFAULT 'english',
  	"status" "enum_house_churches_status" DEFAULT 'active',
  	"lat" numeric DEFAULT 35.54078384255158 NOT NULL,
  	"lng" numeric DEFAULT -97.45800992201534 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "house_churches_id" integer;
  CREATE INDEX IF NOT EXISTS "house_churches_updated_at_idx" ON "house_churches" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "house_churches_created_at_idx" ON "house_churches" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_house_churches_fk" FOREIGN KEY ("house_churches_id") REFERENCES "public"."house_churches"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_house_churches_id_idx" ON "payload_locked_documents_rels" USING btree ("house_churches_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "house_churches" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "house_churches" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_house_churches_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_house_churches_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "house_churches_id";
  DROP TYPE "public"."enum_house_churches_language";
  DROP TYPE "public"."enum_house_churches_status";`)
}
