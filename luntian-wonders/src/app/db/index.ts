import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// This relies on your .env.local having DATABASE_URL
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);