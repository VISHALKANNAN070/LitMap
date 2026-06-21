CREATE TABLE "papers" (
	"id" serial PRIMARY KEY NOT NULL,
	"arxiv_id" text NOT NULL,
	"title" text NOT NULL,
	"abstract" text NOT NULL,
	"pdf_url" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
