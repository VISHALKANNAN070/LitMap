import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import * as schema from "../schemas/papers.js";

dotenv.config();

console.log(process.env.DB_URL)
const sql = neon(process.env.DB_URL!);

export const db = drizzle(sql, { schema });
