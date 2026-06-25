import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { papers } from "../schemas/papers.js";
import { extractArxivId, fetchPaperMetadata } from "./arxiv.service.js";

export const importPaper = async (url: string) => {
  const arxivId = extractArxivId(url);

  const existingPaper = await db.query.papers.findFirst({
    where: eq(papers.arxivId, arxivId),
  });
  if (existingPaper) {
    return existingPaper;
  }

  const metadata = fetchPaperMetadata(arxivId);
  await db
    .insert(papers)
    .values({
      arxivId: (await metadata).arxivId,
      title: (await metadata).title,
      abstract: (await metadata).abstract,
      authors: (await metadata).authors.join(""),
      pdfUrl: (await metadata).pdfURL,
    })
    .returning();
};
