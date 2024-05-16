-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "Domain" (
	"domainId" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Subdomain" (
	"subdomainId" text PRIMARY KEY NOT NULL,
	"domainId" text NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SubdomainContact" (
	"contactId" text PRIMARY KEY NOT NULL,
	"subdomainId" text NOT NULL,
	"personId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SubdomainResourceLink" (
	"linkId" text PRIMARY KEY NOT NULL,
	"subdomainId" text NOT NULL,
	"title" text NOT NULL,
	"subTitle" text DEFAULT 'Goto Resource' NOT NULL,
	"href" text NOT NULL,
	"iconUri" text DEFAULT 'https://cdn1.vectorstock.com/i/1000x1000/25/25/resources-allocation-icon-on-white-vector-27442525.jpg'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Team" (
	"teamId" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"iconUri" text DEFAULT 'https://cdn-icons-png.flaticon.com/512/1369/1369288.png',
	"domainId" text NOT NULL,
	"subdomainId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Project" (
	"projectId" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"iconUri" text DEFAULT 'https://cdn-icons-png.freepik.com/256/12148/12148631.png',
	"description" text DEFAULT '' NOT NULL,
	"domainId" text NOT NULL,
	"teamId" text NOT NULL,
	"documentationId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"userId" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"fullName" text NOT NULL,
	"iconUri" text DEFAULT 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ProjectContact" (
	"contactId" text PRIMARY KEY NOT NULL,
	"projectId" text NOT NULL,
	"personId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Skill" (
	"skillId" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"domainId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ProjectResourceLink" (
	"linkId" text PRIMARY KEY NOT NULL,
	"projectId" text NOT NULL,
	"title" text NOT NULL,
	"subTitle" text DEFAULT 'Goto Resource' NOT NULL,
	"href" text NOT NULL,
	"iconUri" text DEFAULT 'https://cdn1.vectorstock.com/i/1000x1000/25/25/resources-allocation-icon-on-white-vector-27442525.jpg'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Technology" (
	"technologyId" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"domainId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Person" (
	"personId" text PRIMARY KEY NOT NULL,
	"personalContactMobile" text,
	"personalContactEmail" text,
	"contactEmail" text,
	"contactMobile" text,
	"userId" text NOT NULL,
	"domainId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Documentation" (
	"documentationId" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"parentId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PersonSkill" (
	"personId" text NOT NULL,
	"skillId" text NOT NULL,
	CONSTRAINT "PersonSkill_pkey" PRIMARY KEY("personId","skillId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ProjectTechnology" (
	"projectId" text NOT NULL,
	"technologyId" text NOT NULL,
	CONSTRAINT "ProjectTechnology_pkey" PRIMARY KEY("projectId","technologyId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TeamMember" (
	"teamId" text NOT NULL,
	"personId" text NOT NULL,
	"role" text DEFAULT 'Team Member' NOT NULL,
	CONSTRAINT "TeamMember_pkey" PRIMARY KEY("teamId","personId")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Domain_name_key" ON "Domain" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Subdomain_name_key" ON "Subdomain" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Subdomain_domainId_idx" ON "Subdomain" ("domainId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SubdomainContact_personId_idx" ON "SubdomainContact" ("personId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SubdomainContact_subdomainId_idx" ON "SubdomainContact" ("subdomainId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "SubdomainContact_personId_subdomainId_key" ON "SubdomainContact" ("subdomainId","personId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SubdomainResourceLink_subdomainId_idx" ON "SubdomainResourceLink" ("subdomainId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Team_domainId_idx" ON "Team" ("domainId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Project_domainId_idx" ON "Project" ("domainId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Project_documentationId_key" ON "Project" ("documentationId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ProjectContact_personId_idx" ON "ProjectContact" ("personId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ProjectContact_projectId_idx" ON "ProjectContact" ("projectId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ProjectContact_personId_projectId_key" ON "ProjectContact" ("projectId","personId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Skill_domainId_name_key" ON "Skill" ("name","domainId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ProjectResourceLink_projectId_idx" ON "ProjectResourceLink" ("projectId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Technology_domainId_name_key" ON "Technology" ("name","domainId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Person_userId_idx" ON "Person" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Person_domainId_idx" ON "Person" ("domainId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "TeamMember_personId_key" ON "TeamMember" ("personId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "TeamMember_teamId_idx" ON "TeamMember" ("teamId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Subdomain" ADD CONSTRAINT "Subdomain_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "public"."Domain"("domainId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "SubdomainContact" ADD CONSTRAINT "SubdomainContact_subdomainId_fkey" FOREIGN KEY ("subdomainId") REFERENCES "public"."Subdomain"("subdomainId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "SubdomainContact" ADD CONSTRAINT "SubdomainContact_personId_fkey" FOREIGN KEY ("personId") REFERENCES "public"."Person"("personId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "SubdomainResourceLink" ADD CONSTRAINT "SubdomainResourceLink_subdomainId_fkey" FOREIGN KEY ("subdomainId") REFERENCES "public"."Subdomain"("subdomainId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Team" ADD CONSTRAINT "Team_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "public"."Domain"("domainId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Team" ADD CONSTRAINT "Team_subdomainId_fkey" FOREIGN KEY ("subdomainId") REFERENCES "public"."Subdomain"("subdomainId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Project" ADD CONSTRAINT "Project_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "public"."Domain"("domainId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Project" ADD CONSTRAINT "Project_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("teamId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Project" ADD CONSTRAINT "Project_documentationId_fkey" FOREIGN KEY ("documentationId") REFERENCES "public"."Documentation"("documentationId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ProjectContact" ADD CONSTRAINT "ProjectContact_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("projectId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ProjectContact" ADD CONSTRAINT "ProjectContact_personId_fkey" FOREIGN KEY ("personId") REFERENCES "public"."Person"("personId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Skill" ADD CONSTRAINT "Skill_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "public"."Domain"("domainId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ProjectResourceLink" ADD CONSTRAINT "ProjectResourceLink_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("projectId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Technology" ADD CONSTRAINT "Technology_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "public"."Domain"("domainId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Person" ADD CONSTRAINT "Person_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Person" ADD CONSTRAINT "Person_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "public"."Domain"("domainId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Documentation" ADD CONSTRAINT "Documentation_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Documentation"("documentationId") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PersonSkill" ADD CONSTRAINT "PersonSkill_personId_fkey" FOREIGN KEY ("personId") REFERENCES "public"."Person"("personId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PersonSkill" ADD CONSTRAINT "PersonSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("skillId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ProjectTechnology" ADD CONSTRAINT "ProjectTechnology_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("projectId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ProjectTechnology" ADD CONSTRAINT "ProjectTechnology_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "public"."Technology"("technologyId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("teamId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_personId_fkey" FOREIGN KEY ("personId") REFERENCES "public"."Person"("personId") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/