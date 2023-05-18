import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '046950dc-0219-4a2d-ab90-4dbd74f86d18',
      title: 'Room cleaning',
      description: 'Room cealning service',
      status: TaskStatus.OPEN,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }

  getAllTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    return this.tasks
      .filter(({ status }) => !filterDto.status || status === filterDto.status)
      .filter(
        ({ title }) => !filterDto.search || title.includes(filterDto.search),
      );
  }

  createTask({ title, description }: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(taskId: string): Task {
    // try to get task
    const task = this.tasks.find(({ id }) => id === taskId);

    // if not found, throw an error (404 not found)
    if (!task) {
      throw new NotFoundException(`Task with id "${taskId}" not found`);
    }

    // otherwise, return the task
    return task;
  }

  deleteTaskById(taskId: string): void {
    const task = this.getTaskById(taskId);
    this.tasks = this.tasks.filter(({ id }) => id !== task.id);
  }

  updateTaskById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
