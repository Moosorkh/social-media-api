import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateExerciseDto {
  @ApiProperty({ description: 'Name of the exercise', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Description of the exercise', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Difficulty level of the exercise (1-5)', minimum: 1, maximum: 5, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  difficultyLevel?: number;
}