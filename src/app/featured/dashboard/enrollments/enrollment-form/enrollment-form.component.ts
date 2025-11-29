import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Student } from '../../../../core/models/student.model';
import { Course } from '../../../../core/models/course.model';
import { Enrollment, EnrollmentStatus } from '../../../../core/models/enrollment.model';
import * as EnrollmentsActions from '../../../../store/enrollments/enrollments.actions';
import * as StudentsActions from '../../../../store/students/students.actions';
import * as CoursesActions from '../../../../store/courses/courses.actions';
import { selectAllStudents } from '../../../../store/students/students.selectors';
import { selectAllCourses } from '../../../../store/courses/courses.selectors';
import { selectEnrollmentById } from '../../../../store/enrollments/enrollments.selectors';

@Component({
  selector: 'app-enrollment-form',
  standalone: false,
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css'],
})
export class EnrollmentFormComponent implements OnInit {
  enrollmentForm!: FormGroup;
  isEditMode = false;
  enrollmentId?: number | string;
  
  students$: Observable<Student[]>;
  courses$: Observable<Course[]>;
  
  statusOptions: EnrollmentStatus[] = ['active', 'completed', 'cancelled'];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.students$ = this.store.select(selectAllStudents);
    this.courses$ = this.store.select(selectAllCourses);
    this.initForm();
  }

  ngOnInit(): void {
    // Cargar estudiantes y cursos
    this.store.dispatch(StudentsActions.loadStudents());
    this.store.dispatch(CoursesActions.loadCourses());
    this.store.dispatch(EnrollmentsActions.loadEnrollments());

    // Verificar si estamos en modo edición
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.enrollmentId = params['id'];
        
        // Deshabilitar campos de estudiante y curso en modo edición
        this.enrollmentForm.get('studentId')?.disable();
        this.enrollmentForm.get('courseId')?.disable();
        
        // Cargar datos de la inscripción
        if (this.enrollmentId) {
          this.loadEnrollment(this.enrollmentId);
        }
      }
    });
  }

  initForm(): void {
    this.enrollmentForm = this.fb.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required],
      status: ['active', Validators.required],
      grade: [null, [Validators.min(0), Validators.max(10)]],
      notes: ['']
    });
  }

  loadEnrollment(id: number | string): void {
    this.store.select(selectEnrollmentById(id)).subscribe(enrollment => {
      if (enrollment) {
        this.enrollmentForm.patchValue({
          studentId: enrollment.studentId,
          courseId: enrollment.courseId,
          status: enrollment.status,
          grade: enrollment.grade,
          notes: enrollment.notes
        });
      }
    });
  }

  onSubmit(): void {
    // En modo edición, el formulario puede ser inválido porque los campos están deshabilitados
    // Usamos getRawValue y validamos manualmente los campos habilitados
    if (this.isEditMode && this.enrollmentId) {
      const formValue = this.enrollmentForm.getRawValue();
      
      // Verificar que los campos editables sean válidos
      if (this.enrollmentForm.get('status')?.valid) {
        const updateData = {
          status: formValue.status,
          grade: formValue.grade,
          notes: formValue.notes
        };
        
        this.store.dispatch(
          EnrollmentsActions.updateEnrollment({ 
            id: this.enrollmentId, 
            enrollment: updateData 
          })
        );
        this.router.navigate(['/dashboard/enrollments']);
      } else {
        this.enrollmentForm.markAllAsTouched();
      }
    } else if (this.enrollmentForm.valid) {
      // Modo creación
      const formValue = this.enrollmentForm.value;
      const createData = {
        studentId: Number(formValue.studentId),
        courseId: Number(formValue.courseId),
        notes: formValue.notes || ''
      };
      
      this.store.dispatch(
        EnrollmentsActions.createEnrollment({ enrollment: createData })
      );
      this.router.navigate(['/dashboard/enrollments']);
    } else {
      this.enrollmentForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/enrollments']);
  }

  get studentId() {
    return this.enrollmentForm.get('studentId');
  }

  get courseId() {
    return this.enrollmentForm.get('courseId');
  }

  get status() {
    return this.enrollmentForm.get('status');
  }

  get grade() {
    return this.enrollmentForm.get('grade');
  }

  get notes() {
    return this.enrollmentForm.get('notes');
  }

  // Función para comparar IDs independientemente de si son string o number
  compareIds(id1: any, id2: any): boolean {
    return id1 && id2 && Number(id1) === Number(id2);
  }
}
