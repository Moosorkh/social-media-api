import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.rating.deleteMany();
  await prisma.save.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding database...');

  // Create users
  const password = await bcrypt.hash('password123', 10);
  
  const user1 = await prisma.user.create({
    data: {
      username: 'testuser1',
      password,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'testuser2',
      password,
    },
  });

  console.log('Created users:', { user1: user1.id, user2: user2.id });

  // Create exercises
  const exercise1 = await prisma.exercise.create({
    data: {
      name: 'Push-ups',
      description: 'Basic upper body exercise',
      difficultyLevel: 2,
      isPublic: true,
      creatorId: user1.id,
    },
  });

  const exercise2 = await prisma.exercise.create({
    data: {
      name: 'Squats',
      description: 'Lower body compound movement',
      difficultyLevel: 3,
      isPublic: true,
      creatorId: user1.id,
    },
  });

  const exercise3 = await prisma.exercise.create({
    data: {
      name: 'Private Exercise',
      description: 'Only visible to creator',
      difficultyLevel: 1,
      isPublic: false,
      creatorId: user2.id,
    },
  });

  console.log('Created exercises:', { 
    exercise1: exercise1.id, 
    exercise2: exercise2.id,
    exercise3: exercise3.id,
  });

  // Create favorites
  const favorite1 = await prisma.favorite.create({
    data: {
      userId: user2.id,
      exerciseId: exercise1.id,
    },
  });

  // Create saves
  const save1 = await prisma.save.create({
    data: {
      userId: user2.id,
      exerciseId: exercise2.id,
    },
  });

  // Create ratings
  const rating1 = await prisma.rating.create({
    data: {
      userId: user2.id,
      exerciseId: exercise1.id,
      value: 5,
    },
  });

  const rating2 = await prisma.rating.create({
    data: {
      userId: user1.id,
      exerciseId: exercise2.id,
      value: 4,
    },
  });

  console.log('Created relationships');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });