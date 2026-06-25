import { Request, Response } from "express";
import { importPaper } from "../services/paper.service.js";

export const importPaperController = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const paper = await importPaper(url);
    console.log(paper);
    return res.status(201).json({ success: true, paper });
  } catch (error) {
    console.dir(error, { depth: null });
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
