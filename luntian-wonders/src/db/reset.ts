import { db } from './index';
import { sql } from 'drizzle-orm';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const main = async () => {
  console.log('🗑️  Wiping database tables...');

  try {
    // Drop tables in the correct order (child tables first)
    await db.execute(sql`DROP TABLE IF EXISTS "user_progress" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "posts" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "quests" CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS "users" CASCADE`);
    
    console.log('✨ Database wiped clean.');
  } catch (error) {
    console.error('❌ Reset failed:', error);
  }
  process.exit(0);
};

main();