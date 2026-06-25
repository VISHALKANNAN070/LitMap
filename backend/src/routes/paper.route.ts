import { Router } from "express";
import { importPaperController } from "../controllers/paper.controller.js";
const router = Router();

router.post("/import", importPaperController);

export default router;
