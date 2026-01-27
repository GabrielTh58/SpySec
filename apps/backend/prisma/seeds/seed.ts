//import { seedLevels } from './data/levels';
//import { seedBadges } from './badges';
import { PrismaService } from 'src/db/prisma.service';
import { seedTracks } from './tracks-missions-seed';

const prisma = new PrismaService()

async function main() {
  console.log('Starting Database Seed...');
  
  //await seedLevels(prisma);
  //await seedBadges(prisma);
  await seedTracks(prisma)
  console.log('Database Seed Completed!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    prisma.onModuleDestroy
  });