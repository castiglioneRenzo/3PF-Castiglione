import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { Student } from '../../../../core/models/student.model';
import { Course } from '../../../../core/models/course.model';
import { Enrollment } from '../../../../core/models/enrollment.model';
import * as StudentsActions from '../../../../store/students/students.actions';
import * as CoursesActions from '../../../../store/courses/courses.actions';
import * as EnrollmentsActions from '../../../../store/enrollments/enrollments.actions';
import {
  selectStudentById,
  selectStudentsLoading,
} from '../../../../store/students/students.selectors';
import { selectAllCourses } from '../../../../store/courses/courses.selectors';
import { selectAllEnrollments } from '../../../../store/enrollments/enrollments.selectors';
import { selectIsAdmin } from '../../../../store/auth/auth.selectors';

interface EnrollmentDetail {
  enrollment: Enrollment;
  course: Course;
}

@Component({
  selector: 'app-student-detail',
  standalone: false,
  templateUrl: './student-detail.html',
  styleUrls: ['./student-detail.css'],
})
export class StudentDetail implements OnInit, OnDestroy {
  student$!: Observable<Student | undefined>;
  loading$: Observable<boolean>;
  enrollmentDetails$!: Observable<EnrollmentDetail[]>;
  isAdmin$: Observable<boolean>;
  
  displayedColumns: string[] = ['courseName', 'courseCode', 'enrollmentDate'];
  
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.loading$ = this.store.select(selectStudentsLoading);
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    
    if (!studentId) {
      this.router.navigate(['/dashboard/students']);
      return;
    }

    // Cargar datos necesarios
    this.store.dispatch(StudentsActions.loadStudents());
    this.store.dispatch(CoursesActions.loadCourses());
    this.store.dispatch(EnrollmentsActions.loadEnrollments());

    // Seleccionar el estudiante
    this.student$ = this.store.select(selectStudentById(studentId));

    // Combinar inscripciones con cursos
    this.enrollmentDetails$ = combineLatest([
      this.store.select(selectAllEnrollments),
      this.store.select(selectAllCourses),
    ]).pipe(
      map(([enrollments, courses]) => {
        // Filtrar inscripciones del estudiante
        const studentEnrollments = enrollments.filter(
          (e) => String(e.studentId) === String(studentId)
        );

        // Combinar con información del curso
        return studentEnrollments
          .map((enrollment) => {
            const course = courses.find(
              (c) => String(c.id) === String(enrollment.courseId)
            );
            return course ? { enrollment, course } : null;
          })
          .filter((detail): detail is EnrollmentDetail => detail !== null);
      }),
      takeUntil(this.destroy$)
    );
  }

  onBack(): void {
    this.router.navigate(['/dashboard/students']);
  }

  onEdit(studentId: number | string): void {
    this.router.navigate(['/dashboard/students/edit', studentId]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
