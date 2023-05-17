import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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
    return this.tasks.find(({ id }) => id === taskId);
  }

  deleteTaskById(taskId: string): void {
    this.tasks = this.tasks.filter(({ id }) => id !== taskId);
  }

  updateTaskById({ id, status }: UpdateTaskDto): Task {
    let updatedTask;
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        updatedTask = { ...task, status };
        return { ...task, status };
      }

      return task;
    });

    return updatedTask;
  }
}
