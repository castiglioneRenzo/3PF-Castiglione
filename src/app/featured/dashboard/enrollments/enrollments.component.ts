import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { Enrollment } from '../../../core/models/enrollment.model';
import { Student } from '../../../core/models/student.model';
import { Course } from '../../../core/models/course.model';
import * as EnrollmentsActions from '../../../store/enrollments/enrollments.actions';
import * as StudentsActions from '../../../store/students/students.actions';
import * as CoursesActions from '../../../store/courses/courses.actions';
import { selectAllEnrollments } from '../../../store/enrollments/enrollments.selectors';
import { selectAllStudents } from '../../../store/students/students.selectors';
import { selectAllCourses } from '../../../store/courses/courses.selectors';
import { selectIsAdmin } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-enrollments',
  standalone: false,
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css'],
})
export class EnrollmentsComponent implements OnInit {
  enrollments$: Observable<Enrollment[]>;
  students$: Observable<Student[]>;
  courses$: Observable<Course[]>;
  enrollmentsView$: Observable<any[]>;
  isAdmin$: Observable<boolean>;
  displayedColumns: string[] = [
    'id',
    'student',
    'course',
    'enrollmentDate',
    'status',
    'grade',
    'actions',
  ];

  constructor(private store: Store) {
    this.enrollments$ = this.store.select(selectAllEnrollments);
    this.students$ = this.store.select(selectAllStudents);
    this.courses$ = this.store.select(selectAllCourses);
    this.isAdmin$ = this.store.select(selectIsAdmin);

    this.enrollmentsView$ = combineLatest([
      this.enrollments$,
      this.students$,
      this.courses$
    ]).pipe(
      map(([enrollments, students, courses]) => {
        console.log('Enrollments:', enrollments);
        console.log('Students:', students);
        console.log('Courses:', courses);
        const e = enrollments.map(enrollment => {
          const student = students.find(s => String(s.id) === String(enrollment.studentId));
          const course = courses.find(c => String(c.id) === String(enrollment.courseId));
          return {
            ...enrollment,
            studentName: student ? `${student.firstName} ${student.lastName}` : 'N/A',
            courseName: course ? course.name : 'N/A',
            grade: enrollment.grade === null || enrollment.grade === undefined ? 'N/A' : enrollment.grade
          };
        });
        console.log('Enrollments View:', e);
        return enrollments.map(enrollment => {
          const student = students.find(s => String(s.id) === String(enrollment.studentId));
          const course = courses.find(c => String(c.id) === String(enrollment.courseId));
          return {
            ...enrollment,
            studentName: student ? `${student.firstName} ${student.lastName}` : 'N/A',
            courseName: course ? course.name : 'N/A',
            grade: enrollment.grade === null || enrollment.grade === undefined ? 'N/A' : enrollment.grade
          };
        });
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(EnrollmentsActions.loadEnrollments());
    this.store.dispatch(StudentsActions.loadStudents());
    this.store.dispatch(CoursesActions.loadCourses());
  }



  onDelete(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta inscripción?')) {
      this.store.dispatch(EnrollmentsActions.deleteEnrollment({ id }));
    }
  }
}
