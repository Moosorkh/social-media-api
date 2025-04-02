import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RateExerciseDto } from './dto/rate-exercise.dto';

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  async rateExercise(userId: string, exerciseId: string, rateExerciseDto: RateExerciseDto) {
    // Check if exercise exists
    const exercise = await this.prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    // Add/update rating
    return this.prisma.rating.upsert({
      where: {
        userId_exerciseId: {
          userId,
          exerciseId,
        },
      },
      update: {
        value: rateExerciseDto.value,
      },
      create: {
        userId,
        exerciseId,
        value: rateExerciseDto.value,
      },
    });
  }

  async getUserRatings(userId: string) {
    return this.prisma.rating.findMany({
      where: {
        userId,
      },
      include: {
        exercise: true,
      },
    });
  }

  async getExerciseRatings(exerciseId: string) {
    // Check if exercise exists
    const exercise = await this.prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    const ratings = await this.prisma.rating.findMany({
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

    // Calculate average rating
    const totalRatings = ratings.length;
    const sumRatings = ratings.reduce((sum, rating) => sum + rating.value, 0);
    const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

    return {
      ratings,
      stats: {
        totalRatings,
        averageRating,
      },
    };
  }
}