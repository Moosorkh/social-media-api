import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateExerciseDto {
  @ApiProperty({ description: 'Name of the exercise' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the exercise' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Difficulty level of the exercise (1-5)', minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  difficultyLevel: number;

  @ApiProperty({ description: 'Whether the exercise is public', default: true })
  @IsBoolean()
  isPublic: boolean;
}