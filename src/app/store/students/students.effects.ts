import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, mergeMap } from 'rxjs/operators';
import * as StudentsActions from './students.actions';
import { StudentsService } from '../../core/services/students/students.service';

@Injectable()
export class StudentsEffects {
  private readonly actions$ = inject(Actions);
  private readonly studentsService = inject(StudentsService);

  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      exhaustMap(() =>
        this.studentsService.getAll().pipe(
          map((students) => StudentsActions.loadStudentsSuccess({ students })),
          catchError((error) =>
            of(StudentsActions.loadStudentsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.createStudent),
      mergeMap((action) =>
        this.studentsService.create(action.student).pipe(
          map((student) => StudentsActions.createStudentSuccess({ student })),
          catchError((error) =>
            of(StudentsActions.createStudentFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.updateStudent),
      mergeMap((action) =>
        this.studentsService.update(action.id, action.student).pipe(
          map((student) => StudentsActions.updateStudentSuccess({ student })),
          catchError((error) =>
            of(StudentsActions.updateStudentFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.deleteStudent),
      mergeMap((action) =>
        this.studentsService.delete(action.id).pipe(
          map(() => StudentsActions.deleteStudentSuccess({ id: action.id })),
          catchError((error) =>
            of(StudentsActions.deleteStudentFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
