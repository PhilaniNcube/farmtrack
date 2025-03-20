CREATE TABLE "activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"activity_type" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"performed_by" varchar(255),
	"performed_at" timestamp NOT NULL,
	"category" varchar(100) NOT NULL,
	"related_to" varchar(255),
	"notes" text,
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crops" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"variety" varchar(255) NOT NULL,
	"planting_date" timestamp NOT NULL,
	"expected_harvest_date" timestamp NOT NULL,
	"location" varchar(255) NOT NULL,
	"area" numeric NOT NULL,
	"area_unit" varchar(50) NOT NULL,
	"status" varchar(50) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finances" (
	"id" serial PRIMARY KEY NOT NULL,
	"transaction_date" timestamp NOT NULL,
	"category" varchar(100) NOT NULL,
	"amount" numeric NOT NULL,
	"transaction_type" varchar(50) NOT NULL,
	"description" text,
	"payment_method" varchar(100),
	"associated_with" varchar(255),
	"receipt_url" varchar(512),
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'user' NOT NULL,
	"farm_name" varchar(255),
	"farm_location" varchar(255),
	"profile_image_url" varchar(512),
	"is_active" boolean DEFAULT true NOT NULL,
	"last_login" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"due_date" timestamp NOT NULL,
	"priority" varchar(50) NOT NULL,
	"status" varchar(50) NOT NULL,
	"category" varchar(100) NOT NULL,
	"assigned_to" varchar(255),
	"related_to" varchar(255),
	"user_id" varchar(255) NOT NULL,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "livestock" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(100) NOT NULL,
	"breed" varchar(100) NOT NULL,
	"count" integer NOT NULL,
	"acquisition_date" timestamp NOT NULL,
	"source" varchar(255),
	"location" varchar(255) NOT NULL,
	"health_status" varchar(50) NOT NULL,
	"purpose" varchar(100),
	"notes" text,
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inventory" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_name" varchar(255) NOT NULL,
	"category" varchar(100) NOT NULL,
	"quantity" numeric NOT NULL,
	"unit" varchar(50) NOT NULL,
	"purchase_date" timestamp,
	"expiry_date" timestamp,
	"purchase_price" numeric,
	"supplier" varchar(255),
	"storage_location" varchar(255),
	"reorder_level" numeric,
	"notes" text,
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
