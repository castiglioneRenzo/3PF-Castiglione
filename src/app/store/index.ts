import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { studentsReducer, StudentsState } from './students/students.reducer';
import { coursesReducer, CoursesState } from './courses/courses.reducer';
import { enrollmentsReducer, EnrollmentsState } from './enrollments/enrollments.reducer';
import { usersReducer, UsersState } from './users/users.reducer';

export interface AppState {
  auth: AuthState;
  students: StudentsState;
  courses: CoursesState;
  enrollments: EnrollmentsState;
  users: UsersState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  auth: authReducer,
  students: studentsReducer,
  courses: coursesReducer,
  enrollments: enrollmentsReducer,
  users: usersReducer,
};
