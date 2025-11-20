import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentsState } from './students.reducer';

export const selectStudentsState = createFeatureSelector<StudentsState>('students');

export const selectAllStudents = createSelector(
  selectStudentsState,
  (state) => state.students
);

export const selectStudentsLoading = createSelector(
  selectStudentsState,
  (state) => state.loading
);

export const selectStudentsError = createSelector(
  selectStudentsState,
  (state) => state.error
);

export const selectActiveStudents = createSelector(
  selectAllStudents,
  (students) => students.filter((s) => s.active)
);

export const selectStudentById = (id: number) =>
  createSelector(selectAllStudents, (students) => students.find((s) => s.id === id));
