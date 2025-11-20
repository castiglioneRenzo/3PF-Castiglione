import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, mergeMap } from 'rxjs/operators';
import * as CoursesActions from './courses.actions';
import { CoursesService } from '../../core/services/courses/courses.service';

@Injectable()
export class CoursesEffects {
  private readonly actions$ = inject(Actions);
  private readonly coursesService = inject(CoursesService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.loadCourses),
      exhaustMap(() =>
        this.coursesService.getAll().pipe(
          map((courses) => {
            console.log('Cursos recibidos en efecto:', courses);
            return CoursesActions.loadCoursesSuccess({ courses });
          }),
          catchError((error) =>
            of(CoursesActions.loadCoursesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.createCourse),
      mergeMap((action) =>
        this.coursesService.create(action.course).pipe(
          map((course) => CoursesActions.createCourseSuccess({ course })),
          catchError((error) =>
            of(CoursesActions.createCourseFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.updateCourse),
      mergeMap((action) =>
        this.coursesService.update(action.id, action.course).pipe(
          map((course) => CoursesActions.updateCourseSuccess({ course })),
          catchError((error) =>
            of(CoursesActions.updateCourseFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      mergeMap((action) =>
        this.coursesService.delete(action.id).pipe(
          map(() => CoursesActions.deleteCourseSuccess({ id: action.id })),
          catchError((error) =>
            of(CoursesActions.deleteCourseFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
