import { Controller, Post, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RateExerciseDto } from './dto/rate-exercise.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('ratings')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post(':exerciseId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Rate an exercise' })
  @ApiParam({ name: 'exerciseId', description: 'Exercise ID' })
  @ApiResponse({ status: 201, description: 'Exercise rated successfully' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  rateExercise(
    @Param('exerciseId') exerciseId: string,
    @Body() rateExerciseDto: RateExerciseDto,
    @Request() req,
  ) {
    return this.ratingsService.rateExercise(req.user.id, exerciseId, rateExerciseDto);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all ratings by current user' })
  @ApiResponse({ status: 200, description: 'Returns all user ratings' })
  getUserRatings(@Request() req) {
    return this.ratingsService.getUserRatings(req.user.id);
  }

  @Get('exercise/:exerciseId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get ratings for an exercise' })
  @ApiParam({ name: 'exerciseId', description: 'Exercise ID' })
  @ApiResponse({ status: 200, description: 'Returns ratings for the exercise' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  getExerciseRatings(@Param('exerciseId') exerciseId: string) {
    return this.ratingsService.getExerciseRatings(exerciseId);
  }
}