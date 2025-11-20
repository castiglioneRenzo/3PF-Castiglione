import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, mergeMap } from 'rxjs/operators';
import * as UsersActions from './users.actions';
import { UsersService } from '../../core/services/users/users.service';

@Injectable()
export class UsersEffects {
  private readonly actions$ = inject(Actions);
  private readonly usersService = inject(UsersService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      exhaustMap(() =>
        this.usersService.getAll().pipe(
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError((error) => of(UsersActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.createUser),
      mergeMap((action) =>
        this.usersService.create(action.user).pipe(
          map((user) => UsersActions.createUserSuccess({ user })),
          catchError((error) => of(UsersActions.createUserFailure({ error: error.message })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateUser),
      mergeMap((action) =>
        this.usersService.update(action.id, action.user).pipe(
          map((user) => UsersActions.updateUserSuccess({ user })),
          catchError((error) => of(UsersActions.updateUserFailure({ error: error.message })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      mergeMap((action) =>
        this.usersService.delete(action.id).pipe(
          map(() => UsersActions.deleteUserSuccess({ id: action.id })),
          catchError((error) => of(UsersActions.deleteUserFailure({ error: error.message })))
        )
      )
    )
  );
}
