import { Controller, Post, Delete, Param, Get, UseGuards, Request } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':exerciseId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Favorite an exercise' })
  @ApiParam({ name: 'exerciseId', description: 'Exercise ID' })
  @ApiResponse({ status: 201, description: 'Exercise favorited successfully' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  addFavorite(@Param('exerciseId') exerciseId: string, @Request() req) {
    return this.favoritesService.addFavorite(req.user.id, exerciseId);
  }

  @Delete(':exerciseId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a favorite' })
  @ApiParam({ name: 'exerciseId', description: 'Exercise ID' })
  @ApiResponse({ status: 200, description: 'Favorite removed successfully' })
  @ApiResponse({ status: 404, description: 'Favorite not found' })
  removeFavorite(@Param('exerciseId') exerciseId: string, @Request() req) {
    return this.favoritesService.removeFavorite(req.user.id, exerciseId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all favorites for current user' })
  @ApiResponse({ status: 200, description: 'Returns all user favorites' })
  getUserFavorites(@Request() req) {
    return this.favoritesService.getUserFavorites(req.user.id);
  }

  @Get('exercise/:exerciseId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get users who favorited an exercise' })
  @ApiParam({ name: 'exerciseId', description: 'Exercise ID' })
  @ApiResponse({ status: 200, description: 'Returns users who favorited the exercise' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  getUsersWhoFavorited(@Param('exerciseId') exerciseId: string) {
    return this.favoritesService.getUsersWhoFavorited(exerciseId);
  }
}