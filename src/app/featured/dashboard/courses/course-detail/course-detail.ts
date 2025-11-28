import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { Course } from '../../../../core/models/course.model';
import { Student } from '../../../../core/models/student.model';
import { Enrollment } from '../../../../core/models/enrollment.model';
import * as CoursesActions from '../../../../store/courses/courses.actions';
import * as StudentsActions from '../../../../store/students/students.actions';
import * as EnrollmentsActions from '../../../../store/enrollments/enrollments.actions';
import {
  selectCourseById,
  selectCoursesLoading,
} from '../../../../store/courses/courses.selectors';
import { selectAllStudents } from '../../../../store/students/students.selectors';
import { selectAllEnrollments } from '../../../../store/enrollments/enrollments.selectors';

interface EnrollmentDetail {
  enrollment: Enrollment;
  student: Student;
}

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.html',
  standalone: false,
  styleUrls: ['./course-detail.css'],
})
export class CourseDetail implements OnInit, OnDestroy {
  course$!: Observable<Course | undefined>;
  loading$: Observable<boolean>;
  enrollmentDetails$!: Observable<EnrollmentDetail[]>;
  totalStudents$!: Observable<number>;
  
  displayedColumns: string[] = ['studentName', 'studentEmail', 'enrollmentDate'];
  
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.loading$ = this.store.select(selectCoursesLoading);
  }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    
    if (!courseId) {
      this.router.navigate(['/dashboard/courses']);
      return;
    }

    // Cargar datos necesarios
    this.store.dispatch(CoursesActions.loadCourses());
    this.store.dispatch(StudentsActions.loadStudents());
    this.store.dispatch(EnrollmentsActions.loadEnrollments());

    // Seleccionar el curso
    this.course$ = this.store.select(selectCourseById(courseId));

    // Combinar inscripciones con estudiantes
    this.enrollmentDetails$ = combineLatest([
      this.store.select(selectAllEnrollments),
      this.store.select(selectAllStudents),
    ]).pipe(
      map(([enrollments, students]) => {
        // Filtrar inscripciones del curso
        const courseEnrollments = enrollments.filter(
          (e) => String(e.courseId) === String(courseId)
        );

        // Combinar con información del estudiante
        return courseEnrollments
          .map((enrollment) => {
            const student = students.find(
              (s) => String(s.id) === String(enrollment.studentId)
            );
            return student ? { enrollment, student } : null;
          })
          .filter((detail): detail is EnrollmentDetail => detail !== null);
      }),
      takeUntil(this.destroy$)
    );

    // Calcular total de estudiantes
    this.totalStudents$ = this.enrollmentDetails$.pipe(
      map((details) => details.length)
    );
  }

  onBack(): void {
    this.router.navigate(['/dashboard/courses']);
  }

  onEdit(courseId: number | string): void {
    this.router.navigate(['/dashboard/courses/edit', courseId]);
  }

  onViewStudent(studentId: number | string): void {
    this.router.navigate(['/dashboard/students', studentId]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
