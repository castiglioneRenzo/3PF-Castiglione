import { Component, Input } from '@angular/core';
import { Alumno } from '../../interfaces/alumno.interface';

@Component({
  selector: 'app-alumnos-lista',
  templateUrl: './alumnos-lista.component.html',
  styleUrl: './alumnos-lista.component.css',
  standalone: false
})
export class AlumnosListaComponent {
  @Input() alumnos: Alumno[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'email', 'edad'];
}