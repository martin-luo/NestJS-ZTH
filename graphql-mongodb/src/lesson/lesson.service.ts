import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.eneity';
import { v4 as uuid } from 'uuid';
import { LessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLesson(id: string): Promise<Lesson> {
    return await this.lessonRepository.findOne({ id });
  }

  async createLesson({
    name,
    startDate,
    endDate,
  }: LessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      name,
      startDate,
      endDate,
      id: uuid(),
    });

    return await this.lessonRepository.save(lesson);
  }
}
