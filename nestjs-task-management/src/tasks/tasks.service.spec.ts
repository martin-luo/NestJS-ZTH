import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'Ariel',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    // Initializes a NestJS module with tasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('should call TasksRepository.getTasks and returns the result', async () => {
      (tasksRepository.getTasks as jest.Mock).mockResolvedValue('some value');

      const result = await tasksService.getTasks(null, mockUser);

      expect(result).toEqual('some value');
    });
  });

  describe('getTaskById', () => {
    it('should call TasksRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test description',
        id: 'test id',
        status: TaskStatus.OPEN,
      };
      (tasksRepository.findOne as jest.Mock).mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById('test id', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('should call TasksRepository.findOne and handles an error', async () => {
      (tasksRepository.findOne as jest.Mock).mockResolvedValue(null);

      expect(tasksService.getTaskById('test id', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
