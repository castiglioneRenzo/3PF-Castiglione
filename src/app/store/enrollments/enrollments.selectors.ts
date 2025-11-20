import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentsState } from './enrollments.reducer';

export const selectEnrollmentsState =
  createFeatureSelector<EnrollmentsState>('enrollments');

export const selectAllEnrollments = createSelector(
  selectEnrollmentsState,
  (state) => state.enrollments
);

export const selectEnrollmentsLoading = createSelector(
  selectEnrollmentsState,
  (state) => state.loading
);

export const selectEnrollmentsError = createSelector(
  selectEnrollmentsState,
  (state) => state.error
);

export const selectEnrollmentsByStudentId = (studentId: number) =>
  createSelector(selectAllEnrollments, (enrollments) =>
    enrollments.filter((e) => e.studentId === studentId)
  );

export const selectEnrollmentsByCourseId = (courseId: number) =>
  createSelector(selectAllEnrollments, (enrollments) =>
    enrollments.filter((e) => e.courseId === courseId)
  );

export const selectActiveEnrollments = createSelector(
  selectAllEnrollments,
  (enrollments) => enrollments.filter((e) => e.status === 'active')
);
