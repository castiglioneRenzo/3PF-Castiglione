import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAdmin } from '../../store/auth/auth.selectors';

interface MenuItem {
  name: string;
  route: string;
  adminOnly?: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: false
})
export class NavbarComponent implements OnInit {
  isAdmin$!: Observable<boolean>;
  
  allMenuItems: MenuItem[] = [
    { name: 'Inicio', route: '/dashboard' },
    { name: 'Alumnos', route: '/dashboard/students' },
    { name: 'Cursos', route: '/dashboard/courses' },
    { name: 'Inscripciones', route: '/dashboard/enrollments' },
    { name: 'Usuarios', route: '/dashboard/users', adminOnly: true }
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }
}