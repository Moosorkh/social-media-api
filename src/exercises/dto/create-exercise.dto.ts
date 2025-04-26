import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { BaseExerciseDto } from './base-exercise.dto';

export class CreateExerciseDto extends BaseExerciseDto {
  @ApiProperty({ description : 'Wheather the exercise is public', default: true })
  @IsBoolean()
  isPublic: boolean;
}