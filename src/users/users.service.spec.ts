import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UserRepository;

  const user: UserEntity = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password',
    createdAt: new Date(),
    admin: true,
  };

  const createUserDto: CreateUserDto = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password',
    admin: true,
  };

  const updateUserDto: UpdateUserDto = {
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    password: 'newpassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(user),
            findAll: jest.fn().mockResolvedValue([user]),
            findOne: jest.fn().mockResolvedValue(user),
            update: jest.fn().mockResolvedValue(user),
            remove: jest.fn().mockResolvedValue(user),
            findByEmail: jest.fn().mockResolvedValue(user),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user and return it', async () => {
      const result = await service.create(createUserDto);
      expect(repository.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual([user]);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result = await service.findOne(user.id);
      expect(repository.findOne).toHaveBeenCalledWith(user.id);
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user and return it', async () => {
      const result = await service.update(user.id, updateUserDto);
      expect(repository.update).toHaveBeenCalledWith(user.id, updateUserDto);
      expect(result).toEqual(user);
    });
  });

  describe('remove', () => {
    it('should remove a user and return it', async () => {
      const result = await service.remove(user.id);
      expect(repository.remove).toHaveBeenCalledWith(user.id);
      expect(result).toEqual(user);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const result = await service.findByEmail(user.email);
      expect(repository.findByEmail).toHaveBeenCalledWith(user.email);
      expect(result).toEqual(user);
    });
  });
});
