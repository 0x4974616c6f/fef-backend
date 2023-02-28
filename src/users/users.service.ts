import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.repository.create(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.repository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.repository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<UserEntity> {
    return this.repository.remove(id);
  }
}
