CREATE TABLE "teams" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"display_name" varchar(255) NOT NULL,
	"profile_image_url" varchar(512),
	"server_metadata" jsonb,
	"client_metadata" jsonb,
	"client_read_only_metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
