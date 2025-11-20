import { createReducer, on } from '@ngrx/store';
import { Student } from '../../core/models/student.model';
import * as StudentsActions from './students.actions';

export interface StudentsState {
  students: Student[];
  loading: boolean;
  error: string | null;
}

export const initialState: StudentsState = {
  students: [],
  loading: false,
  error: null,
};

export const studentsReducer = createReducer(
  initialState,
  // Load Students
  on(StudentsActions.loadStudents, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentsActions.loadStudentsSuccess, (state, { students }) => ({
    ...state,
    students,
    loading: false,
    error: null,
  })),
  on(StudentsActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // Create Student
  on(StudentsActions.createStudent, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentsActions.createStudentSuccess, (state, { student }) => ({
    ...state,
    students: [...state.students, student],
    loading: false,
    error: null,
  })),
  on(StudentsActions.createStudentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // Update Student
  on(StudentsActions.updateStudent, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentsActions.updateStudentSuccess, (state, { student }) => ({
    ...state,
    students: state.students.map((s) => (s.id === student.id ? student : s)),
    loading: false,
    error: null,
  })),
  on(StudentsActions.updateStudentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // Delete Student
  on(StudentsActions.deleteStudent, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentsActions.deleteStudentSuccess, (state, { id }) => ({
    ...state,
    students: state.students.filter((s) => s.id !== id),
    loading: false,
    error: null,
  })),
  on(StudentsActions.deleteStudentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
