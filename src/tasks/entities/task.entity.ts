import { Task } from '@prisma/client';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class TaskEntity implements Task {
  id: number;
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

export class Done {
  @IsBoolean()
  @IsNotEmpty()
  done: boolean;
}
