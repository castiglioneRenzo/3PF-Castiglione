import { Component } from '@angular/core';
import { Alumno } from '../interfaces/alumno.interface';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css',
  standalone: false
})
export class AlumnosComponent {
  alumnos: Alumno[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan.perez@email.com', edad: 20 },
    { id: 2, nombre: 'María', apellido: 'García', email: 'maria.garcia@email.com', edad: 22 },
    { id: 3, nombre: 'Carlos', apellido: 'López', email: 'carlos.lopez@email.com', edad: 19 },
    { id: 4, nombre: 'Ana', apellido: 'Martínez', email: 'ana.martinez@email.com', edad: 21 },
    { id: 5, nombre: 'Pedro', apellido: 'Rodríguez', email: 'pedro.rodriguez@email.com', edad: 23 }
  ];

  mostrarFormulario = false;

  onAlumnoCreado(nuevoAlumno: Omit<Alumno, 'id'>): void {
    const newId = this.alumnos.length > 0 ? Math.max(...this.alumnos.map(a => a.id)) + 1 : 1;
    const alumno: Alumno = { id: newId, ...nuevoAlumno };
    
    this.alumnos.push(alumno);
    this.mostrarFormulario = false; // Volver a la lista después de crear
    
    console.log('Nuevo alumno agregado:', alumno);
    console.log('Lista actualizada:', this.alumnos);
  }

  onMostrarFormulario(): void {
    this.mostrarFormulario = true;
  }

  onMostrarLista(): void {
    this.mostrarFormulario = false;
  }
}