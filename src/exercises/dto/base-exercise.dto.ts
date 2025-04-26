import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class BaseExerciseDto {
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
}