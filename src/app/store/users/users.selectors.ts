import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(selectUsersState, (state) => state.users);

export const selectUsersLoading = createSelector(selectUsersState, (state) => state.loading);

export const selectUsersError = createSelector(selectUsersState, (state) => state.error);

export const selectActiveUsers = createSelector(selectAllUsers, (users) =>
  users.filter((u) => u.active)
);

export const selectUserById = (id: number) =>
  createSelector(selectAllUsers, (users) => users.find((u) => u.id === id));

export const selectAdminUsers = createSelector(selectAllUsers, (users) =>
  users.filter((u) => u.role === 'admin')
);

export const selectNonAdminUsers = createSelector(selectAllUsers, (users) =>
  users.filter((u) => u.role === 'user')
);
