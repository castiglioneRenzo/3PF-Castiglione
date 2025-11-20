import { createReducer, on } from '@ngrx/store';
import { Course } from '../../core/models/course.model';
import * as CoursesActions from './courses.actions';

export interface CoursesState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialState: CoursesState = {
  courses: [],
  loading: false,
  error: null,
};

export const coursesReducer = createReducer(
  initialState,
  on(CoursesActions.loadCourses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CoursesActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
    error: null,
  })),
  on(CoursesActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CoursesActions.createCourse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CoursesActions.createCourseSuccess, (state, { course }) => ({
    ...state,
    courses: [...state.courses, course],
    loading: false,
    error: null,
  })),
  on(CoursesActions.createCourseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CoursesActions.updateCourse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CoursesActions.updateCourseSuccess, (state, { course }) => ({
    ...state,
    courses: state.courses.map((c) => (c.id === course.id ? course : c)),
    loading: false,
    error: null,
  })),
  on(CoursesActions.updateCourseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CoursesActions.deleteCourse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CoursesActions.deleteCourseSuccess, (state, { id }) => ({
    ...state,
    courses: state.courses.filter((c) => c.id !== id),
    loading: false,
    error: null,
  })),
  on(CoursesActions.deleteCourseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
