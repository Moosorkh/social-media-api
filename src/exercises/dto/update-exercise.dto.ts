import { PartialType } from '@nestjs/swagger';
import { BaseExerciseDto } from './base-exercise.dto';

export class UpdateExerciseDto extends PartialType(BaseExerciseDto) {}