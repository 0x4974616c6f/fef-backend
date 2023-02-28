import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskRepository } from './repositories/tasks.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService, TaskRepository],
})
export class TasksModule {}
