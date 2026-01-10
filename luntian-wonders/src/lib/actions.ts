'use server'
import { db } from '@/db';
import { quests, users, userProgress } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth, currentUser } from '@clerk/nextjs/server'; // V5 import
import { revalidatePath } from 'next/cache';

// ... keep existing getQuests and getQuestBySlug ...

// NEW: Ensure the current user exists in our DB
export async function getOrCreateUser() {
  const user = await currentUser();
  if (!user) return null;

  // Check if user exists by Clerk ID
  const existingUser = await db.select().from(users).where(eq(users.clerkId, user.id)).limit(1);
  
  if (existingUser.length > 0) {
    return existingUser[0];
  }

  // If not, create them
  const newUser = await db.insert(users).values({
    clerkId: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.emailAddresses[0].emailAddress,
    role: 'scout',
    totalXp: 0,
  }).returning();

  return newUser[0];
}

// NEW: Submit Quest Proof
export async function submitQuestProof(questId: number, formData: FormData) {
  const dbUser = await getOrCreateUser();
  if (!dbUser) throw new Error("Must be logged in");

  // In a real app, you would upload the file to Vercel Blob/AWS S3 here.
  // For MVP, we will simulate a successful upload URL.
  const fakeProofUrl = "https://luntian-wonders.org/uploads/proof-placeholder.jpg";

  await db.insert(userProgress).values({
    userId: dbUser.id,
    questId: questId,
    status: 'completed', // Auto-complete for MVP gratification
    proofUrl: fakeProofUrl,
    completedAt: new Date(),
  });

  // Award XP (Simple implementation)
  // Note: ideally we fetch quest XP first, but for now let's just mark progress
  
  revalidatePath('/quests');
  return { success: true };
}