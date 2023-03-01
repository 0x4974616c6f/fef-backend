import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Done } from './entities/task.entity';
import { TaskRepository } from './repositories/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly repository: TaskRepository) {}

  create(createTaskDto: CreateTaskDto) {
    return this.repository.create(createTaskDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.repository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }

  done(id: number, done: Done) {
    return this.repository.done(id, done);
  }
}
