import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './repositories/tasks.repository';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let repository: TaskRepository;

  const createTaskDto: CreateTaskDto = {
    title: 'Task Title',
    description: 'Task Description',
    userId: 1,
    done: true,
  };

  const task = {
    id: 1,
    ...createTaskDto,
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TaskRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(task),
            findAll: jest.fn().mockResolvedValue([task]),
            findOne: jest.fn().mockResolvedValue(task),
            update: jest.fn().mockResolvedValue(task),
            remove: jest.fn().mockResolvedValue(task),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<TasksService>(TasksService);
    repository = moduleRef.get<TaskRepository>(TaskRepository);
  });

  describe('create', () => {
    it('should create a task and return it', async () => {
      const result = await service.create(createTaskDto);
      expect(repository.create).toHaveBeenCalledWith(createTaskDto);
      expect(result).toEqual(task);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = await service.findAll();
      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual([task]);
    });
  });

  describe('findOne', () => {
    it('should return a task with the specified id', async () => {
      const result = await service.findOne(task.id);
      expect(repository.findOne).toHaveBeenCalledWith(task.id);
      expect(result).toEqual(task);
    });

    it('should throw a NotFoundException if task is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      expect(service.findOne(task.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateTaskDto: UpdateTaskDto = {
      title: 'New Task Title',
      description: 'New Task Description',
      userId: 2,
    };

    it('should update a task with the specified id and return it', async () => {
      const result = await service.update(task.id, updateTaskDto);
      expect(repository.update).toHaveBeenCalledWith(task.id, updateTaskDto);
      expect(result).toEqual(task);
    });

    it('should throw a NotFoundException if task is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      expect(service.update(task.id, updateTaskDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a task with the specified id and return it', async () => {
      const result = await service.remove(task.id);
      expect(repository.remove).toHaveBeenCalledWith(task.id);
      expect(result).toEqual(task);
    });

    it('should throw a NotFoundException if task is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      expect(service.remove(task.id)).rejects.toThrow(NotFoundException);
    });
  });
});
