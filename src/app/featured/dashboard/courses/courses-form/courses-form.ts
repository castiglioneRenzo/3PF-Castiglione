import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Course } from '../../../../core/models/course.model';
import * as CoursesActions from '../../../../store/courses/courses.actions';
import { selectCourseById } from '../../../../store/courses/courses.selectors';

@Component({
  selector: 'app-courses-form',
  standalone: false,
  templateUrl: './courses-form.html',
  styleUrl: './courses-form.css'
})
export class CoursesForm implements OnInit {
  courseForm!: FormGroup;
  isEditMode = false;
  courseId?: number;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.courseId = +params['id'];
        this.loadCourse(this.courseId);
      }
    });
  }

  initForm(): void {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      duration: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      maxStudents: ['', [Validators.required, Validators.min(1)]],
      instructor: ['', Validators.required],
      schedule: ['', Validators.required]
    });
  }

  loadCourse(id: number): void {
    this.store.select(selectCourseById(id)).subscribe(course => {
      if (course) {
        this.courseForm.patchValue({
          name: course.name,
          description: course.description,
          duration: course.duration,
          startDate: course.startDate,
          endDate: course.endDate,
          maxStudents: course.maxStudents,
          instructor: course.instructor,
          schedule: course.schedule
        });
      }
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const courseData = this.courseForm.value;

      if (this.isEditMode && this.courseId) {
        this.store.dispatch(CoursesActions.updateCourse({ 
          id: this.courseId, 
          course: courseData 
        }));
      } else {
        this.store.dispatch(CoursesActions.createCourse({ course: courseData }));
      }

      this.router.navigate(['/dashboard/courses']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/courses']);
  }

  get name() {
    return this.courseForm.get('name');
  }

  get description() {
    return this.courseForm.get('description');
  }

  get duration() {
    return this.courseForm.get('duration');
  }

  get startDate() {
    return this.courseForm.get('startDate');
  }

  get endDate() {
    return this.courseForm.get('endDate');
  }

  get maxStudents() {
    return this.courseForm.get('maxStudents');
  }

  get instructor() {
    return this.courseForm.get('instructor');
  }

  get schedule() {
    return this.courseForm.get('schedule');
  }
}
