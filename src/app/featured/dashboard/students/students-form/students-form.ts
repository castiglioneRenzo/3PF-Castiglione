import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Student } from '../../../../core/models/student.model';
import * as StudentsActions from '../../../../store/students/students.actions';
import { selectStudentById } from '../../../../store/students/students.selectors';

@Component({
  selector: 'app-students-form',
  standalone: false,
  templateUrl: './students-form.html',
  styleUrl: './students-form.css'
})
export class StudentsForm implements OnInit {
  studentForm!: FormGroup;
  isEditMode = false;
  studentId?: number;

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
        this.studentId = +params['id'];
        this.loadStudent(this.studentId);
      }
    });
  }

  initForm(): void {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthDate: ['', Validators.required]
    });
  }

  loadStudent(id: number): void {
    this.store.select(selectStudentById(id)).subscribe(student => {
      if (student) {
        this.studentForm.patchValue({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          phone: student.phone,
          address: student.address,
          birthDate: student.birthDate
        });
      }
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;

      if (this.isEditMode && this.studentId) {
        this.store.dispatch(StudentsActions.updateStudent({ 
          id: this.studentId, 
          student: studentData 
        }));
      } else {
        this.store.dispatch(StudentsActions.createStudent({ student: studentData }));
      }

      this.router.navigate(['/dashboard/students']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/students']);
  }

  get firstName() {
    return this.studentForm.get('firstName');
  }

  get lastName() {
    return this.studentForm.get('lastName');
  }

  get email() {
    return this.studentForm.get('email');
  }

  get phone() {
    return this.studentForm.get('phone');
  }

  get address() {
    return this.studentForm.get('address');
  }

  get birthDate() {
    return this.studentForm.get('birthDate');
  }
}
