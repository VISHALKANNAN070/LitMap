import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const papers = pgTable("papers", {
  id: serial("id").primaryKey(),
  arxivId: text("arxiv_id").notNull().unique(),
  title: text("title").notNull(),
  abstract: text("abstract").notNull(),
  authors:text("authors").notNull(),
  pdfUrl: text("pdf_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
