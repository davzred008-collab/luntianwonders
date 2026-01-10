import { pgTable, serial, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

// 1. Users (Updated with Clerk ID)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: text('clerk_id').unique(), // <--- This is the new link to Clerk
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').default('scout'),
  totalXp: integer('total_xp').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

// 2. Quests
export const quests = pgTable('quests', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  difficulty: text('difficulty').default('easy'),
  xpReward: integer('xp_reward').notNull(),
  isActive: boolean('is_active').default(true),
});

// 3. User Progress
export const userProgress = pgTable('user_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  questId: integer('quest_id').references(() => quests.id),
  status: text('status').default('in_progress'),
  completedAt: timestamp('completed_at'),
  proofUrl: text('proof_url'),
});

// 4. Posts
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  authorId: integer('author_id').references(() => users.id),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});