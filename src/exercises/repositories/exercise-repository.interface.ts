import { Exercise, Prisma } from '@prisma/client';

export interface IExerciseRepository {
  findOne(id: string): Promise<Exercise | null>;
  findMany(where: Prisma.ExerciseWhereInput, orderBy?: any): Promise<Exercise[]>;
  create(data: Prisma.ExerciseCreateInput): Promise<Exercise>;
  update(id: string, data: Prisma.ExerciseUpdateInput): Promise<Exercise>;
  delete(id: string): Promise<Exercise>;
  count(where: Prisma.ExerciseWhereInput): Promise<number>;
}