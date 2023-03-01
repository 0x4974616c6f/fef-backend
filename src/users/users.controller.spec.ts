import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, UserRepository, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: UserEntity[] = [
        {
          id: 1,
          name: 'John',
          admin: true,
          password: '1asdfjaskldfj!231412309D',
          createdAt: new Date(),
          email: 'askldfjasfklj@gmail.com',
        },
      ];
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const result: UserEntity = {
        id: 1,
        name: 'John',
        admin: true,
        password: '1asdfjaskldfj!231412309D',
        createdAt: new Date(),
        email: 'askldfjasfklj@gmail.com',
      };
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const result: UserEntity = {
        id: 1,
        name: 'John',
        admin: true,
        password: '1asdfjaskldfj!231412309D',
        createdAt: new Date(),
        email: 'askldfjasfklj@gmail.com',
      };
      const userDto: CreateUserDto = {
        name: 'John',
        admin: true,
        email: 'john@gmail.com',
        password: 'Ikajsf1234912!',
      };
      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.create(userDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const result: UserEntity = {
        id: 1,
        name: 'John',
        admin: true,
        password: '1asdfjaskldfj!231412309D',
        createdAt: new Date(),
        email: 'askldfjasfklj@gmail.com',
      };
      const userDto: UpdateUserDto = { name: 'John' };
      jest
        .spyOn(service, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.update('1', userDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      const result: UserEntity = {
        id: 1,
        name: 'John',
        admin: true,
        password: '1asdfjaskldfj!231412309D',
        createdAt: new Date(),
        email: 'askldfjasfklj@gmail.com',
      };

      jest
        .spyOn(service, 'remove')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.remove('1')).toBe(result);
    });
  });
});
