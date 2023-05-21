import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.eneity';
import { v4 as uuid } from 'uuid';
import { LessonInput } from './lesson.input';
import { AssignStudentToLessonInput } from './assign-student-to-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }

  async getLesson(id: string): Promise<Lesson> {
    return await this.lessonRepository.findOne({ id });
  }

  async createLesson({
    name,
    startDate,
    endDate,
    students,
  }: LessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      name,
      startDate,
      endDate,
      students,
      id: uuid(),
    });

    return await this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson({
    studentIds,
    lessonId,
  }: AssignStudentToLessonInput): Promise<Lesson> {
    const lesson = await this.getLesson(lessonId);
    lesson.students = [...lesson.students, ...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
