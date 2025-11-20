import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, mergeMap } from 'rxjs/operators';
import * as EnrollmentsActions from './enrollments.actions';
import { EnrollmentsService } from '../../core/services/enrollments/enrollments.service';

@Injectable()
export class EnrollmentsEffects {
  private readonly actions$ = inject(Actions);
  private readonly enrollmentsService = inject(EnrollmentsService);

  loadEnrollments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentsActions.loadEnrollments),
      exhaustMap(() =>
        this.enrollmentsService.getAll().pipe(
          map((enrollments) => EnrollmentsActions.loadEnrollmentsSuccess({ enrollments })),
          catchError((error) =>
            of(EnrollmentsActions.loadEnrollmentsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createEnrollment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentsActions.createEnrollment),
      mergeMap((action) =>
        this.enrollmentsService.create(action.enrollment).pipe(
          map((enrollment) => EnrollmentsActions.createEnrollmentSuccess({ enrollment })),
          catchError((error) =>
            of(EnrollmentsActions.createEnrollmentFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateEnrollment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentsActions.updateEnrollment),
      mergeMap((action) =>
        this.enrollmentsService.update(action.id, action.enrollment).pipe(
          map((enrollment) => EnrollmentsActions.updateEnrollmentSuccess({ enrollment })),
          catchError((error) =>
            of(EnrollmentsActions.updateEnrollmentFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteEnrollment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentsActions.deleteEnrollment),
      mergeMap((action) =>
        this.enrollmentsService.delete(action.id).pipe(
          map(() => EnrollmentsActions.deleteEnrollmentSuccess({ id: action.id })),
          catchError((error) =>
            of(EnrollmentsActions.deleteEnrollmentFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
