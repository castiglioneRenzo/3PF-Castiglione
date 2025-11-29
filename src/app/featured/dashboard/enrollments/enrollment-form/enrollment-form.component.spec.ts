import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { EnrollmentFormComponent } from './enrollment-form.component';
import * as EnrollmentsActions from '../../../../store/enrollments/enrollments.actions';
import * as StudentsActions from '../../../../store/students/students.actions';
import * as CoursesActions from '../../../../store/courses/courses.actions';
import { selectAllStudents } from '../../../../store/students/students.selectors';
import { selectAllCourses } from '../../../../store/courses/courses.selectors';
import { selectEnrollmentById } from '../../../../store/enrollments/enrollments.selectors';
import { Student } from '../../../../core/models/student.model';
import { Course } from '../../../../core/models/course.model';
import { Enrollment } from '../../../../core/models/enrollment.model';

describe('EnrollmentFormComponent', () => {
  let component: EnrollmentFormComponent;
  let fixture: ComponentFixture<EnrollmentFormComponent>;
  let store: MockStore;
  let router: jasmine.SpyObj<Router>;
  let route: ActivatedRoute;

  const mockStudents: Student[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      phone: '123456789',
      address: '123 Main St',
      birthDate: '2000-01-01',
      enrollmentDate: '2024-01-01',
      active: true
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@test.com',
      phone: '987654321',
      address: '456 Oak Ave',
      birthDate: '2001-02-15',
      enrollmentDate: '2024-01-15',
      active: true
    }
  ];

  const mockCourses: Course[] = [
    {
      id: '1',
      name: 'Angular Fundamentals',
      description: 'Learn Angular basics',
      duration: 40,
      startDate: '2024-01-01',
      endDate: '2024-03-01',
      maxStudents: 30,
      instructor: 'Prof. Smith',
      schedule: 'Lunes y Miércoles 18:00-20:00',
      active: true
    },
    {
      id: '2',
      name: 'TypeScript Advanced',
      description: 'Advanced TypeScript concepts',
      duration: 60,
      startDate: '2024-02-01',
      endDate: '2024-04-01',
      maxStudents: 25,
      instructor: 'Prof. Johnson',
      schedule: 'Martes y Jueves 19:00-21:00',
      active: true
    }
  ];

  const mockEnrollment: Enrollment = {
    id: '1',
    studentId: 1,
    courseId: 1,
    enrollmentDate: '2024-01-15',
    status: 'active',
    grade: null,
    notes: ''
  };

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [EnrollmentFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectAllStudents, value: mockStudents },
            { selector: selectAllCourses, value: mockCourses },
          ],
        }),
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollmentFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    route = TestBed.inject(ActivatedRoute);

    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    fixture.detectChanges();
    
    expect(component.enrollmentForm).toBeDefined();
    expect(component.enrollmentForm.get('studentId')?.value).toBe('');
    expect(component.enrollmentForm.get('courseId')?.value).toBe('');
    expect(component.enrollmentForm.get('status')?.value).toBe('active');
    expect(component.enrollmentForm.get('grade')?.value).toBeNull();
    expect(component.enrollmentForm.get('notes')?.value).toBe('');
  });

  it('should dispatch load actions on init', () => {
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(StudentsActions.loadStudents());
    expect(store.dispatch).toHaveBeenCalledWith(CoursesActions.loadCourses());
    expect(store.dispatch).toHaveBeenCalledWith(EnrollmentsActions.loadEnrollments());
  });

  it('should mark form as invalid when required fields are empty', () => {
    fixture.detectChanges();
    
    expect(component.enrollmentForm.valid).toBeFalse();
    expect(component.enrollmentForm.get('studentId')?.hasError('required')).toBeTrue();
    expect(component.enrollmentForm.get('courseId')?.hasError('required')).toBeTrue();
  });

  it('should validate grade within 0-10 range', () => {
    fixture.detectChanges();
    
    const gradeControl = component.enrollmentForm.get('grade');
    
    gradeControl?.setValue(-1);
    expect(gradeControl?.hasError('min')).toBeTrue();
    
    gradeControl?.setValue(11);
    expect(gradeControl?.hasError('max')).toBeTrue();
    
    gradeControl?.setValue(8);
    expect(gradeControl?.valid).toBeTrue();
  });

  it('should dispatch createEnrollment action when form is valid in create mode', () => {
    fixture.detectChanges();
    
    component.enrollmentForm.setValue({
      studentId: '1',
      courseId: '2',
      status: 'active',
      grade: 9,
      notes: 'Excellent student'
    });

    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: EnrollmentsActions.createEnrollment.type,
      })
    );
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/enrollments']);
  });

  it('should enter edit mode and load enrollment when id param exists', () => {
    store.overrideSelector(selectEnrollmentById('1'), mockEnrollment);
    route.params = of({ id: '1' });

    fixture.detectChanges();

    expect(component.isEditMode).toBeTrue();
    expect(component.enrollmentId).toBe('1');
    expect(component.enrollmentForm.get('studentId')?.disabled).toBeTrue();
    expect(component.enrollmentForm.get('courseId')?.disabled).toBeTrue();
  });

  it('should dispatch updateEnrollment action in edit mode', () => {
    component.isEditMode = true;
    component.enrollmentId = '1';
    
    fixture.detectChanges();
    
    component.enrollmentForm.patchValue({
      status: 'completed',
      grade: 10,
      notes: 'Course completed successfully'
    });

    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: EnrollmentsActions.updateEnrollment.type,
      })
    );
  });

  it('should navigate back to enrollments list on cancel', () => {
    fixture.detectChanges();
    
    component.onCancel();
    
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/enrollments']);
  });
});
