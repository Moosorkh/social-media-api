import { Controller, Post, Delete, Param, Get, UseGuards, Request } from '@nestjs/common';
import { SavesService } from './saves.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('saves')
@Controller('saves')
export class SavesController {
  constructor(private readonly savesService: SavesService) {}

  @Post(':exerciseId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Save an exercise' })
  @ApiParam({ name: 'exerciseId', description: 'Exercise ID' })
  @ApiResponse({ status: 201, description: 'Exercise saved successfully' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  saveExercise(@Param('exerciseId') exerciseId: string, @Request() req) {
    return this.savesService.saveExercise(req.user.id, exerciseId);
  }

  @Delete(':exerciseId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a saved exercise' })
  @ApiParam({ name: 'exerciseId', description: 'Exercise ID' })
  @ApiResponse({ status: 200, description: 'Save removed successfully' })
  @ApiResponse({ status: 404, description: 'Save not found' })
  unsaveExercise(@Param('exerciseId') exerciseId: string, @Request() req) {
    return this.savesService.unsaveExercise(req.user.id, exerciseId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all saved exercises for current user' })
  @ApiResponse({ status: 200, description: 'Returns all user saved exercises' })
  getUserSaves(@Request() req) {
    return this.savesService.getUserSaves(req.user.id);
  }

  @Get('exercise/:exerciseId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get users who saved an exercise' })
  @ApiParam({ name: 'exerciseId', description: 'Exercise ID' })
  @ApiResponse({ status: 200, description: 'Returns users who saved the exercise' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  getUsersWhoSaved(@Param('exerciseId') exerciseId: string) {
    return this.savesService.getUsersWhoSaved(exerciseId);
  }

  @Get('combined')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get combined list of saved and favorited exercises' })
  @ApiResponse({ status: 200, description: 'Returns combined list with saved/favorited indicators' })
  getUserSavedAndFavorited(@Request() req) {
    return this.savesService.getUserSavedAndFavorited(req.user.id);
  }
}