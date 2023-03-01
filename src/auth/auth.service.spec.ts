import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../src/prisma/prisma.service';
import { UserRepository } from '../../src/users/repositories/users.repository';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        UserRepository,
        PrismaService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mock-token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('should return an access token on successful login', async () => {
      // Arrange
      const user: UserEntity = {
        id: 1,
        name: 'Test User',
        email: 'test@test.com',
        password: await bcrypt.hash('testpassword', 10),
        admin: false,
        createdAt: new Date(),
      };
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('mock-token');
      const loginDto: LoginDto = {
        email: 'test@test.com',
        password: 'testpassword',
      };

      // Act
      const result = await authService.login(loginDto);

      // Assert
      expect(result.access_token).toBe('mock-token');
      expect(usersService.findByEmail).toBeCalledWith('test@test.com');
      expect(jwtService.sign).toBeCalledWith({
        email: 'test@test.com',
        sub: 1,
      });
    });

    it('should throw an UnauthorizedException when login fails', async () => {
      // Arrange
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(undefined);
      const loginDto: LoginDto = {
        email: 'test@test.com',
        password: 'testpassword',
      };

      // Act + Assert
      await expect(authService.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(usersService.findByEmail).toBeCalledWith('test@test.com');
    });
  });
});
