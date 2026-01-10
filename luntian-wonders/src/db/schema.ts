// src/db/schema.ts

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: text('clerk_id').unique(), // <--- ADD THIS LINE
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').default('scout'),
  totalXp: integer('total_xp').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});