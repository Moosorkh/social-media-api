import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Exercise, Prisma } from '@prisma/client';
import { IExerciseRepository } from './exercise-repository.interface';

@Injectable()
export class ExerciseRepository implements IExerciseRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<Exercise | null> {
    return this.prisma.exercise.findUnique({
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
  }

  async findMany(where: Prisma.ExerciseWhereInput, orderBy?: any): Promise<Exercise[]> {
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

  async create(data: Prisma.ExerciseCreateInput): Promise<Exercise> {
    return this.prisma.exercise.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ExerciseUpdateInput): Promise<Exercise> {
    return this.prisma.exercise.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Exercise> {
    return this.prisma.exercise.delete({
      where: { id },
    });
  }

  async count(where: Prisma.ExerciseWhereInput): Promise<number> {
    return this.prisma.exercise.count({ where });
  }
}