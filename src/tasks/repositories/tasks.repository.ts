import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { NotFoundError } from '../../common/errors/types';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { userId } = createTaskDto;

    delete createTaskDto.userId;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const data: Prisma.TaskCreateInput = {
      ...createTaskDto,
      author: {
        connect: {
          id: user.id,
        },
      },
    };
    return this.prisma.task.create({
      data,
    });
  }

  async findAll(): Promise<TaskEntity[]> {
    return this.prisma.task.findMany();
  }

  async findOne(id: number): Promise<TaskEntity> {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    const { userId } = updateTaskDto;

    if (!userId) {
      return this.prisma.task.update({
        where: {
          id,
        },
        data: updateTaskDto,
      });
    }

    delete updateTaskDto.userId;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const data: Prisma.TaskUpdateInput = {
      ...updateTaskDto,
      author: {
        connect: {
          id: user.id,
        },
      },
    };

    return this.prisma.task.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number): Promise<TaskEntity> {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
