import { createAction, props } from '@ngrx/store';
import {
  Enrollment,
  CreateEnrollmentDto,
  UpdateEnrollmentDto,
} from '../../core/models/enrollment.model';

// Load Enrollments
export const loadEnrollments = createAction('[Enrollments] Load Enrollments');

export const loadEnrollmentsSuccess = createAction(
  '[Enrollments] Load Enrollments Success',
  props<{ enrollments: Enrollment[] }>()
);

export const loadEnrollmentsFailure = createAction(
  '[Enrollments] Load Enrollments Failure',
  props<{ error: string }>()
);

// Create Enrollment
export const createEnrollment = createAction(
  '[Enrollments] Create Enrollment',
  props<{ enrollment: CreateEnrollmentDto }>()
);

export const createEnrollmentSuccess = createAction(
  '[Enrollments] Create Enrollment Success',
  props<{ enrollment: Enrollment }>()
);

export const createEnrollmentFailure = createAction(
  '[Enrollments] Create Enrollment Failure',
  props<{ error: string }>()
);

// Update Enrollment
export const updateEnrollment = createAction(
  '[Enrollments] Update Enrollment',
  props<{ id: number; enrollment: UpdateEnrollmentDto }>()
);

export const updateEnrollmentSuccess = createAction(
  '[Enrollments] Update Enrollment Success',
  props<{ enrollment: Enrollment }>()
);

export const updateEnrollmentFailure = createAction(
  '[Enrollments] Update Enrollment Failure',
  props<{ error: string }>()
);

// Delete Enrollment
export const deleteEnrollment = createAction(
  '[Enrollments] Delete Enrollment',
  props<{ id: number }>()
);

export const deleteEnrollmentSuccess = createAction(
  '[Enrollments] Delete Enrollment Success',
  props<{ id: number }>()
);

export const deleteEnrollmentFailure = createAction(
  '[Enrollments] Delete Enrollment Failure',
  props<{ error: string }>()
);
