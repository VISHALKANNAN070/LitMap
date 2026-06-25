import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { PaperMetaData } from "../types/paper.js";

export interface ArxivAuthor {
  name: string;
}

export interface ArxivLink {
  "@_href": string;
  "@_title": string;
  "@_type": string;
  "@_rel": string;
}

export interface ArxivEntry {
  title: string;
  summary: string;
  author: ArxivAuthor[] | ArxivAuthor;
  link: ArxivLink[] | ArxivLink;
}

export const extractArxivId = (url: string): string => {
  const regex = /arxiv\.org\/abs\/([^\/]+)/;
  const match = url.match(regex);
  if (!match) {
    throw new Error("Invalid arxiv URL");
  }
  return match[1];
};

export const fetchPaperMetadata = async (arxivId: string) => {
  const response = await axios.get(
    `https://export.arxiv.org/api/query?id_list=${arxivId}`,
  );

  const parser = new XMLParser({ ignoreAttributes: false });

  const parsed = parser.parse(response.data);
  const entry = parsed.feed.entry as ArxivEntry | undefined;

  if (!entry) {
    throw new Error("Paper not found");
  }

  const authorList = Array.isArray(entry.author)
    ? entry.author
    : [entry.author];
  const linkList = Array.isArray(entry.link) ? entry.link : [entry.link];

  const authors = authorList.map((author) => author.name);
  const pdfLink = linkList.find((link) => link["@_title"] === "pdf");
  if (!pdfLink) {
    throw new Error("PDF link not found");
  }

  return {
    arxivId,
    title: entry.title.trim(),
    abstract: entry.summary.trim(),
    authors,
    pdfURL: pdfLink["@_href"],
  };
};
