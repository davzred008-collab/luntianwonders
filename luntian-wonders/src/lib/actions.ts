'use server'
import { db } from '@/db';
import { quests } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Fetch all active quests (For the Board)
export async function getQuests() {
  try {
    const allQuests = await db.select().from(quests).where(quests.isActive);
    return allQuests;
  } catch (error) {
    console.error('Failed to fetch quests:', error);
    return [];
  }
}

// Fetch single quest by slug (For the Details Page)
export async function getQuestBySlug(slug: string) {
  try {
    const result = await db.select().from(quests).where(eq(quests.slug, slug)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error('Failed to fetch quest:', error);
    return null;
  }
}