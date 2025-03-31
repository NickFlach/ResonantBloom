CREATE TABLE "glyphs" (
	"id" serial PRIMARY KEY NOT NULL,
	"symbol" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"system" text NOT NULL,
	"state" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "glyphs_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "quantum_states" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"resonance" integer NOT NULL,
	"stability" integer NOT NULL,
	"entanglement" integer NOT NULL,
	"qudits" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "quantum_states_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "rituals" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"glyph_ids" text[] NOT NULL,
	"code" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "rituals_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
