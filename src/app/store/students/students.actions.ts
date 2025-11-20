import { createAction, props } from '@ngrx/store';
import { Student, CreateStudentDto, UpdateStudentDto } from '../../core/models/student.model';

// Load Students
export const loadStudents = createAction('[Students] Load Students');

export const loadStudentsSuccess = createAction(
  '[Students] Load Students Success',
  props<{ students: Student[] }>()
);

export const loadStudentsFailure = createAction(
  '[Students] Load Students Failure',
  props<{ error: string }>()
);

// Create Student
export const createStudent = createAction(
  '[Students] Create Student',
  props<{ student: CreateStudentDto }>()
);

export const createStudentSuccess = createAction(
  '[Students] Create Student Success',
  props<{ student: Student }>()
);

export const createStudentFailure = createAction(
  '[Students] Create Student Failure',
  props<{ error: string }>()
);

// Update Student
export const updateStudent = createAction(
  '[Students] Update Student',
  props<{ id: number; student: UpdateStudentDto }>()
);

export const updateStudentSuccess = createAction(
  '[Students] Update Student Success',
  props<{ student: Student }>()
);

export const updateStudentFailure = createAction(
  '[Students] Update Student Failure',
  props<{ error: string }>()
);

// Delete Student
export const deleteStudent = createAction(
  '[Students] Delete Student',
  props<{ id: number }>()
);

export const deleteStudentSuccess = createAction(
  '[Students] Delete Student Success',
  props<{ id: number }>()
);

export const deleteStudentFailure = createAction(
  '[Students] Delete Student Failure',
  props<{ error: string }>()
);
