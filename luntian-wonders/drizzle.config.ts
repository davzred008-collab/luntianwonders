import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load the environment variables
dotenv.config({ path: ".env.local" });

// Safety Check: If the URL is missing, stop immediately and tell us
if (!process.env.DATABASE_URL) {
  throw new Error("🔴 DATABASE_URL is missing! Check your .env.local file.");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});