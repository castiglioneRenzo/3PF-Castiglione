import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: false
})
export class NavbarComponent {
  menuItems = [
    { name: 'Inicio', route: '/dashboard' },
    { name: 'Alumnos', route: '/dashboard/students' },
    { name: 'Cursos', route: '/dashboard/courses' },
    { name: 'Inscripciones', route: '/dashboard/enrollments' }
  ];
}