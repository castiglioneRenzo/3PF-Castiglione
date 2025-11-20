import { createReducer, on } from '@ngrx/store';
import { Enrollment } from '../../core/models/enrollment.model';
import * as EnrollmentsActions from './enrollments.actions';

export interface EnrollmentsState {
  enrollments: Enrollment[];
  loading: boolean;
  error: string | null;
}

export const initialState: EnrollmentsState = {
  enrollments: [],
  loading: false,
  error: null,
};

export const enrollmentsReducer = createReducer(
  initialState,
  on(EnrollmentsActions.loadEnrollments, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EnrollmentsActions.loadEnrollmentsSuccess, (state, { enrollments }) => ({
    ...state,
    enrollments,
    loading: false,
    error: null,
  })),
  on(EnrollmentsActions.loadEnrollmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EnrollmentsActions.createEnrollment, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EnrollmentsActions.createEnrollmentSuccess, (state, { enrollment }) => ({
    ...state,
    enrollments: [...state.enrollments, enrollment],
    loading: false,
    error: null,
  })),
  on(EnrollmentsActions.createEnrollmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EnrollmentsActions.updateEnrollment, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EnrollmentsActions.updateEnrollmentSuccess, (state, { enrollment }) => ({
    ...state,
    enrollments: state.enrollments.map((e) => (e.id === enrollment.id ? enrollment : e)),
    loading: false,
    error: null,
  })),
  on(EnrollmentsActions.updateEnrollmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EnrollmentsActions.deleteEnrollment, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EnrollmentsActions.deleteEnrollmentSuccess, (state, { id }) => ({
    ...state,
    enrollments: state.enrollments.filter((e) => e.id !== id),
    loading: false,
    error: null,
  })),
  on(EnrollmentsActions.deleteEnrollmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
