import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SavesService {
  constructor(private prisma: PrismaService) {}

  async saveExercise(userId: string, exerciseId: string) {
    // Check if exercise exists
    const exercise = await this.prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    // Add to saves (ignore if already exists)
    return this.prisma.save.upsert({
      where: {
        userId_exerciseId: {
          userId,
          exerciseId,
        },
      },
      update: {},
      create: {
        userId,
        exerciseId,
      },
    });
  }

  async unsaveExercise(userId: string, exerciseId: string) {
    try {
      return await this.prisma.save.delete({
        where: {
          userId_exerciseId: {
            userId,
            exerciseId,
          },
        },
      });
    } catch (error) {
      throw new NotFoundException('Save not found');
    }
  }

  async getUserSaves(userId: string) {
    return this.prisma.save.findMany({
      where: {
        userId,
      },
      include: {
        exercise: {
          include: {
            _count: {
              select: {
                favorites: true,
                saves: true,
              },
            },
          },
        },
      },
    });
  }

  async getUsersWhoSaved(exerciseId: string) {
    // Check if exercise exists
    const exercise = await this.prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    return this.prisma.save.findMany({
      where: {
        exerciseId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async getUserSavedAndFavorited(userId: string) {
    // Get all exercises the user has saved or favorited
    const savedExercises = await this.prisma.save.findMany({
      where: { userId },
      select: { exerciseId: true },
    });

    const favoritedExercises = await this.prisma.favorite.findMany({
      where: { userId },
      select: { exerciseId: true },
    });

    // Extract exercise IDs
    const savedIds = savedExercises.map(s => s.exerciseId);
    const favoritedIds = favoritedExercises.map(f => f.exerciseId);

    // Get all unique exercise IDs
    const allExerciseIds = [...new Set([...savedIds, ...favoritedIds])];

    // Fetch all the exercises
    const exercises = await this.prisma.exercise.findMany({
      where: {
        id: { in: allExerciseIds },
      },
      include: {
        _count: {
          select: {
            favorites: true,
            saves: true,
          },
        },
      },
    });

    // Add saved and favorited flags
    return exercises.map(exercise => ({
      ...exercise,
      isSaved: savedIds.includes(exercise.id),
      isFavorited: favoritedIds.includes(exercise.id),
    }));
  }
}