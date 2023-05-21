import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { LessonInput } from './lesson.input';
import { AssignStudentToLessonInput } from './assign-student-to-lesson.input';
import { Lesson } from './lesson.eneity';
import { StudentService } from '../student/student.service';

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query(returns => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  @Query(returns => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Mutation(returns => LessonType)
  createLesson(@Args('lessonInput') lessonInput: LessonInput) {
    return this.lessonService.createLesson(lessonInput);
  }

  @Mutation(returns => LessonType)
  assignStudentsToLesson(
    @Args('assignToStudentToLessonInput')
    assignStudentToLessonInput: AssignStudentToLessonInput,
  ) {
    return this.lessonService.assignStudentsToLesson(
      assignStudentToLessonInput,
    );
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
