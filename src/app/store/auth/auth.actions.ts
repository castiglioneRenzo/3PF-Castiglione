import { createAction, props } from '@ngrx/store';
import { AuthUser, LoginCredentials } from '../../core/models/user.model';

// Login Actions
export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginCredentials }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: AuthUser }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// Logout Actions
export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

// Check Auth
export const checkAuth = createAction('[Auth] Check Auth');

export const setAuthUser = createAction(
  '[Auth] Set Auth User',
  props<{ user: AuthUser | null }>()
);
