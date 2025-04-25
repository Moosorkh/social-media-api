import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { ExerciseRepository } from './repositories/exercise.repository';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService, ExerciseRepository],
  exports: [ExercisesService],
})
export class ExercisesModule {}