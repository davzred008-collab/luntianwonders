import { db } from './index';
import { quests } from './schema';
import * as dotenv from 'dotenv';

// Load environment variables so we can connect to Neon
dotenv.config({ path: '.env.local' });

const main = async () => {
  console.log('🌱 Seeding Luntian Database...');

  try {
    // Insert Initial Quests
    await db.insert(quests).values([
      {
        title: 'The Plastic-Free Pledge',
        slug: 'plastic-free-pledge',
        description: 'Commit to refusing single-use plastics during your stay in Port Barton. Upload a photo of your reusable water bottle.',
        category: 'Waste Management',
        difficulty: 'Easy',
        xpReward: 100,
        isActive: true,
      },
      {
        title: 'Mangrove Guardian',
        slug: 'mangrove-guardian',
        description: 'Visit the mangrove nursery and assist in planting one propagule. Document your contribution.',
        category: 'Restoration',
        difficulty: 'Medium',
        xpReward: 300,
        isActive: true,
      },
      {
        title: 'Seagrass Scout',
        slug: 'seagrass-scout',
        description: 'Snorkel in the designated area and spot a Green Sea Turtle or Dugong grazing. Take a non-intrusive photo.',
        category: 'Biodiversity',
        difficulty: 'Hard',
        xpReward: 500,
        isActive: true,
      },
      {
        title: 'Eco-Warrior Report',
        slug: 'eco-warrior-report',
        description: 'Spot an environmental violation or a damaged reef area? Submit a geo-tagged report to the Luntian Council.',
        category: 'Advocacy',
        difficulty: 'Medium',
        xpReward: 250,
        isActive: true,
      },
    ]);

    console.log('✅ Seeding Completed! Quests are live.');
  } catch (error) {
    console.error('❌ Seeding Failed:', error);
  }

  process.exit(0);
};

main();