import axios from "axios";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";

export const downloadPdf = async (
  pdfUrl: string,
  arxivId: string,
): Promise<string> => {
  const storageDir = path.join(process.cwd(), "storage", "pdfs");

  fs.mkdirSync(storageDir, { recursive: true });

  const filePath = path.join(storageDir, `${arxivId}.pdf`);

  const response = await axios.get(pdfUrl, { responseType: "stream" });

  const writer = fs.createWriteStream(filePath);

  await pipeline(response.data, writer);

  return filePath;
};
