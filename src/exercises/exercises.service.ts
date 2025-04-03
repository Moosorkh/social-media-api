import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async create(createExerciseDto: CreateExerciseDto, userId: string) {
    return this.prisma.exercise.create({
      data: {
        ...createExerciseDto,
        creator: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll(userId: string, query: any) {
    const { name, description, difficultyLevel, sortBy } = query;
    
    // Build the where clause for filtering
    const where: Prisma.ExerciseWhereInput = {
      OR: [
        { isPublic: true },
        { creatorId: userId },
      ],
      ...(name && { name: { contains: name, mode: 'insensitive' } }),
      ...(description && { description: { contains: description, mode: 'insensitive' } }),
      ...(difficultyLevel && { difficultyLevel: parseInt(difficultyLevel) }),
    };

    // Build the orderBy clause for sorting
    let orderBy = {};
    if (sortBy === 'difficultyLevel') {
      orderBy = { difficultyLevel: 'asc' };
    } else {
      orderBy = { createdAt: 'desc' };
    }

    return this.prisma.exercise.findMany({
      where,
      orderBy,
      include: {
        _count: {
          select: {
            favorites: true,
            saves: true,
          },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            favorites: true,
            saves: true,
          },
        },
      },
    });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    if (!exercise.isPublic && exercise.creatorId !== userId) {
      throw new ForbiddenException('You do not have access to this exercise');
    }

    return exercise;
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto, userId: string) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id },
    });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    // Check if user has permission to update
    if (!exercise.isPublic && exercise.creatorId !== userId) {
      throw new ForbiddenException('You do not have permission to update this exercise');
    }

    return this.prisma.exercise.update({
      where: { id },
      data: updateExerciseDto,
    });
  }

  async remove(id: string, userId: string) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id },
    });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    if (exercise.creatorId !== userId) {
      throw new ForbiddenException('You do not have permission to delete this exercise');
    }

    return this.prisma.exercise.delete({
      where: { id },
    });
  }
}