import { Task } from '@prisma/client';

export class TaskEntity implements Task {
  id: number;
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
