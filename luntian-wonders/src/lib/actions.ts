'use server'
import { db } from '@/db';
import { quests } from '@/db/schema';

// Fetch all active quests
export async function getQuests() {
  try {
    const allQuests = await db.select().from(quests).where(quests.isActive);
    return allQuests;
  } catch (error) {
    console.error('Failed to fetch quests:', error);
    return [];
  }
}