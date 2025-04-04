import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('test-token'),
    verify: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      if (key === 'JWT_SECRET') return 'test-secret';
      if (key === 'JWT_EXPIRES_IN') return '1h';
      if (key === 'JWT_REFRESH_EXPIRES_IN') return '7d';
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto = { username: 'testuser', password: 'password123' };
      const hashedPassword = 'hashedpassword';
      
      jest.spyOn(global.bcrypt, 'hash').mockResolvedValue(hashedPassword as never);
      
      mockPrismaService.user.create.mockResolvedValue({
        id: '1',
        username: createUserDto.username,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.createUser(createUserDto);
      
      expect(result).toEqual({
        id: '1',
        username: createUserDto.username,
      });
      
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          username: createUserDto.username,
          password: hashedPassword,
        },
      });
    });
  });

  // more tests for login, refreshToken, etc.
    describe('login', () => {
        it('should return a token for valid credentials', async () => {
        const loginDto = { username: 'testuser', password: 'password123' };
        const user = { id: '1', username: loginDto.username };
    
        jest.spyOn(service, 'validateUser').mockResolvedValue(user as never);
        mockJwtService.sign.mockReturnValue('test-token');
    
        const result = await service.login(loginDto);
    
        expect(result).toEqual({
            accessToken: 'test-token',
            refreshToken: 'test-token',
        });
        });
    });
});