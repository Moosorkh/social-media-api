import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new exercise' })
  @ApiResponse({ status: 201, description: 'Exercise created successfully' })
  create(@Body() createExerciseDto: CreateExerciseDto, @Request() req) {
    return this.exercisesService.create(createExerciseDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all exercises' })
  @ApiQuery({ name: 'name', required: false, description: 'Filter by name' })
  @ApiQuery({ name: 'description', required: false, description: 'Filter by description' })
  @ApiQuery({ name: 'difficultyLevel', required: false, description: 'Filter by difficulty level' })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['difficultyLevel'], description: 'Sort by field' })
  @ApiResponse({ status: 200, description: 'Returns all accessible exercises' })
  findAll(@Request() req, @Query() query) {
    return this.exercisesService.findAll(req.user.id, query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get exercise by ID' })
  @ApiParam({ name: 'id', description: 'Exercise ID' })
  @ApiResponse({ status: 200, description: 'Returns the exercise' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.exercisesService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an exercise' })
  @ApiParam({ name: 'id', description: 'Exercise ID' })
  @ApiResponse({ status: 200, description: 'Exercise updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto, @Request() req) {
    return this.exercisesService.update(id, updateExerciseDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an exercise' })
  @ApiParam({ name: 'id', description: 'Exercise ID' })
  @ApiResponse({ status: 200, description: 'Exercise deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  remove(@Param('id') id: string, @Request() req) {
    return this.exercisesService.remove(id, req.user.id);
  }
}