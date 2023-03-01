import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/middlewares';
import { UserRepository } from 'src/users/repositories/users.repository';
import { PrismaService } from '../prisma/prisma.service';
import { TaskRepository } from './repositories/tasks.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    PrismaService,
    TaskRepository,
    AuthMiddleware,
    UserRepository,
    // JwtService,
  ],
})
export class TasksModule {}
