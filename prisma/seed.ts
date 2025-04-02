import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: await bcrypt.hash('password123', 10),
    },
  });

  const user2 = await prisma.user.upsert({
    where: { username: 'user' },
    update: {},
    create: {
      username: 'user',
      password: await bcrypt.hash('password123', 10),
    },
  });

  console.log('Users created:', user1, user2);

  // Create exercises
  const exercise1 = await prisma.exercise.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'Push-Up',
      description: 'Standard push-up exercise for upper body strength.',
      difficultyLevel: 3,
      isPublic: true,
      creatorId: user1.id,
    },
  });

  const exercise2 = await prisma.exercise.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      name: 'Squat',
      description: 'Basic squat exercise for lower body.',
      difficultyLevel: 2,
      isPublic: true,
      creatorId: user1.id,
    },
  });

  const exercise3 = await prisma.exercise.upsert({
    where: { id: '3' },
    update: {},
    create: {
      id: '3',
      name: 'Plank',
      description: 'Core strengthening exercise.',
      difficultyLevel: 2,
      isPublic: true,
      creatorId: user2.id,
    },
  });

  const exercise4 = await prisma.exercise.upsert({
    where: { id: '4' },
    update: {},
    create: {
      id: '4',
      name: 'Advanced Handstand',
      description: 'Advanced upper body exercise.',
      difficultyLevel: 5,
      isPublic: false,
      creatorId: user2.id,
    },
  });

  console.log('Exercises created:', exercise1, exercise2, exercise3, exercise4);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });