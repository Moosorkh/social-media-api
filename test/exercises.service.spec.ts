import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesService } from '../src/exercises/exercises.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('ExercisesService', () => {
  let service: ExercisesService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    exercise: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExercisesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ExercisesService>(ExercisesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new exercise', async () => {
      const createExerciseDto = {
        name: 'Test Exercise',
        description: 'Test Description',
        difficultyLevel: 3,
        isPublic: true,
      };
      
      const userId = 'user-id';
      
      mockPrismaService.exercise.create.mockResolvedValue({
        id: 'exercise-id',
        ...createExerciseDto,
        creatorId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.create(createExerciseDto, userId);
      
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(createExerciseDto.name);
      expect(mockPrismaService.exercise.create).toHaveBeenCalledWith({
        data: {
          ...createExerciseDto,
          creatorId: userId,
        },
      });
    });
  });

  // more tests for findAll, findOne, update, remove, etc.
    describe('findAll', () => {
        it('should return all exercises for the user', async () => {
        const userId = 'user-id';
        const query = { name: 'Test' };
        
        mockPrismaService.exercise.findMany.mockResolvedValue([
            {
            id: 'exercise-id',
            name: 'Test Exercise',
            description: 'Test Description',
            difficultyLevel: 3,
            isPublic: true,
            creatorId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            },
        ]);
    
        const result = await service.findAll(userId, query);
        
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Test Exercise');
        });
    });
});