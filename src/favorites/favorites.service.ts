import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async addFavorite(userId: string, exerciseId: string) {
    // Check if exercise exists
    const exercise = await this.prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    // Add to favorites (ignore if already exists)
    return this.prisma.favorite.upsert({
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

  async removeFavorite(userId: string, exerciseId: string) {
    try {
      return await this.prisma.favorite.delete({
        where: {
          userId_exerciseId: {
            userId,
            exerciseId,
          },
        },
      });
    } catch (error) {
      throw new NotFoundException('Favorite not found');
    }
  }

  async getUserFavorites(userId: string) {
    return this.prisma.favorite.findMany({
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

  async getUsersWhoFavorited(exerciseId: string) {
    // Check if exercise exists
    const exercise = await this.prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    return this.prisma.favorite.findMany({
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
}