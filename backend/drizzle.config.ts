import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

console.log(process.env.DB_URL)
export default defineConfig({
  schema: "./src/schemas/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});