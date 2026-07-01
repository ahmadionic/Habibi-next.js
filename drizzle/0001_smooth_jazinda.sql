CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"purpose" text NOT NULL,
	"message" text,
	"pet_names" text,
	"workshop_type" text,
	"preferred_date" text,
	"preferred_contact_method" text,
	"status" text DEFAULT 'new',
	"created_at" timestamp DEFAULT now()
);
