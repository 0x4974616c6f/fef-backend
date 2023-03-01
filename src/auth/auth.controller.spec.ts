import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { UserRepository } from '../../src/users/repositories/users.repository';
import { UsersService } from '../../src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UserRepository,
        UsersService,
        AuthService,
        JwtService,
        PrismaService,
        { provide: 'UsersService', useValue: {} },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return access token when given valid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const expectedResult = { access_token: 'token' };
      jest
        .spyOn(authService, 'login')
        .mockImplementation(async () => expectedResult);

      expect(await controller.login(loginDto)).toEqual(expectedResult);
    });
  });

  describe('register', () => {
    it('should return the created user without password', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        admin: true,
      };
      const expectedResult = { name: 'Test User', email: 'test@example.com' };
      jest
        .spyOn(authService, 'register')
        .mockImplementation(async () => expectedResult);

      expect(await controller.register(createUserDto)).toEqual(expectedResult);
    });
  });
});
