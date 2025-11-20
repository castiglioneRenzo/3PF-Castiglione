import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno } from '../../interfaces/alumno.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumnos-form.component.html',
  styleUrl: './alumnos-form.component.css',
  standalone: false
})
export class AlumnoFormComponent implements OnInit {
  alumnoForm: FormGroup;
  @Output() alumnoCreado = new EventEmitter<Omit<Alumno, 'id'>>();

  constructor(private fb: FormBuilder, private router: Router) {
    this.alumnoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(16), Validators.max(65)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.alumnoForm.valid) {
      const nuevoAlumno: Omit<Alumno, 'id'> = this.alumnoForm.value;
      
      // Emitir el evento al componente padre
      this.alumnoCreado.emit(nuevoAlumno);
      
      console.log("Nuevo alumno creado:", nuevoAlumno);
      alert('Alumno creado exitosamente');
      this.alumnoForm.reset();
      this.router.navigate(['/alumnos']);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.alumnoForm.controls).forEach(key => {
      const control = this.alumnoForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.alumnoForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    
    if (field?.hasError('minlength')) {
      return `Mínimo ${field.errors?.['minlength'].requiredLength} caracteres`;
    }
    
    if (field?.hasError('email')) {
      return 'Email inválido';
    }
    
    if (field?.hasError('min')) {
      return `Edad mínima: ${field.errors?.['min'].min}`;
    }
    
    if (field?.hasError('max')) {
      return `Edad máxima: ${field.errors?.['max'].max}`;
    }
    
    return '';
  }
}