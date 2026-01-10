import { pgTable, serial, text, integer, boolean, timestamp, uuid } from 'drizzle-orm/pg-core';

// 1. Users (Tourists, Advocates, Students)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').default('scout'), // scout, ranger, guardian
  totalXp: integer('total_xp').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

// 2. Quests (The RPG Elements)
export const quests = pgTable('quests', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(), // for URLs
  description: text('description').notNull(),
  category: text('category').notNull(), // e.g., 'Mangrove', 'Waste', 'Education'
  difficulty: text('difficulty').default('easy'), // easy, medium, hard
  xpReward: integer('xp_reward').notNull(),
  isActive: boolean('is_active').default(true),
});

// 3. User Progress (Tracking Quest Completion)
export const userProgress = pgTable('user_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  questId: integer('quest_id').references(() => quests.id),
  status: text('status').default('in_progress'), // in_progress, completed
  completedAt: timestamp('completed_at'),
  proofUrl: text('proof_url'), // URL to uploaded photo evidence
});

// 4. Advocacy Blog (Ecosystem Updates)
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  authorId: integer('author_id').references(() => users.id),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});