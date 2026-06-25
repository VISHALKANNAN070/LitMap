import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import * as schema from "../schemas/papers.js";

dotenv.config();

const sql = neon(process.env.DB_URL!);

export const db = drizzle(sql, { schema });
