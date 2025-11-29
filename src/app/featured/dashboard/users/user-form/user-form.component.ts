import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User, UserRole } from '../../../../core/models/user.model';
import * as UsersActions from '../../../../store/users/users.actions';
import { selectUserById } from '../../../../store/users/users.selectors';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode = false;
  userId?: number | string;
  hidePassword = true;
  
  roleOptions: { value: UserRole; label: string }[] = [
    { value: 'admin', label: 'Administrador' },
    { value: 'user', label: 'Usuario' }
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = params['id'];
        
        // En modo edición, la contraseña no es obligatoria
        this.userForm.get('password')?.clearValidators();
        this.userForm.get('password')?.updateValueAndValidity();
        
        if (this.userId) {
          this.loadUser(this.userId);
        }
      }
    });
  }

  initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      role: ['user', Validators.required],
      active: [true]
    });
  }

  loadUser(id: number | string): void {
    this.store.select(selectUserById(id)).subscribe(user => {
      if (user) {
        this.userForm.patchValue({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          active: user.active
        });
        // No cargamos la contraseña por seguridad
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.userId) {
      // Modo edición
      const formValue = this.userForm.value;
      const updateData: Partial<User> = {
        email: formValue.email,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        role: formValue.role,
        active: formValue.active
      };
      
      // Solo incluir password si se proporcionó uno nuevo
      if (formValue.password && formValue.password.trim()) {
        updateData.password = formValue.password;
      }
      
      this.store.dispatch(
        UsersActions.updateUser({ 
          id: this.userId, 
          user: updateData 
        })
      );
      this.router.navigate(['/dashboard/users']);
    } else if (this.userForm.valid) {
      // Modo creación
      const formValue = this.userForm.value;
      const createData: Partial<User> = {
        email: formValue.email,
        password: formValue.password,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        role: formValue.role,
        active: formValue.active,
        createdAt: new Date().toISOString()
      };
      
      this.store.dispatch(UsersActions.createUser({ user: createData }));
      this.router.navigate(['/dashboard/users']);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/users']);
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get role() {
    return this.userForm.get('role');
  }

  get active() {
    return this.userForm.get('active');
  }
}
