import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTask: TaskEntity = {
    id: 1,
    title: 'Task 1',
    description: 'Description for Task 1',
    done: true,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTasks: TaskEntity[] = [mockTask];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Task 1',
      description: 'Description for Task 1',
      userId: 1,
      done: true,
    };

    it('should return a new task', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockTask);

      const result = await controller.create(createTaskDto);

      expect(result).toEqual(mockTask);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockTasks);

      const result = await controller.findAll();

      expect(result).toEqual(mockTasks);
    });
  });

  describe('findOne', () => {
    it('should return a task with the given id', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockTask);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockTask);
    });
  });

  describe('update', () => {
    const updateTaskDto: UpdateTaskDto = {
      title: 'Updated Task 1',
      description: 'Updated description for Task 1',
      userId: 1,
    };

    it('should return the updated task', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockTask);

      const result = await controller.update('1', updateTaskDto);

      expect(result).toEqual(mockTask);
    });
  });

  describe('remove', () => {
    it('should return the deleted task', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(mockTask);

      const result = await controller.remove('1');

      expect(result).toEqual(mockTask);
    });
  });
});
