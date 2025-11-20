import { createAction, props } from '@ngrx/store';
import { Course, CreateCourseDto, UpdateCourseDto } from '../../core/models/course.model';

// Load Courses
export const loadCourses = createAction('[Courses] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Courses] Load Courses Failure',
  props<{ error: string }>()
);

// Create Course
export const createCourse = createAction(
  '[Courses] Create Course',
  props<{ course: CreateCourseDto }>()
);

export const createCourseSuccess = createAction(
  '[Courses] Create Course Success',
  props<{ course: Course }>()
);

export const createCourseFailure = createAction(
  '[Courses] Create Course Failure',
  props<{ error: string }>()
);

// Update Course
export const updateCourse = createAction(
  '[Courses] Update Course',
  props<{ id: number; course: UpdateCourseDto }>()
);

export const updateCourseSuccess = createAction(
  '[Courses] Update Course Success',
  props<{ course: Course }>()
);

export const updateCourseFailure = createAction(
  '[Courses] Update Course Failure',
  props<{ error: string }>()
);

// Delete Course
export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ id: number }>()
);

export const deleteCourseSuccess = createAction(
  '[Courses] Delete Course Success',
  props<{ id: number }>()
);

export const deleteCourseFailure = createAction(
  '[Courses] Delete Course Failure',
  props<{ error: string }>()
);
