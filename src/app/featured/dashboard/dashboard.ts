import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}
  listItems = [
    {
      name: 'Inicio',
      description: 'Overview of the platform and recent activities.',
      url: '/dashboard',
      icon: 'home'
    },
    {
      name: 'Cursos',
      description: 'Manage and explore the courses offered in the platform.',
      url: '/dashboard/courses',
      icon: 'school'
    },
    {
      name: 'Estudiantes',
      description: 'View and manage student information and progress.',
      url: '/dashboard/students',
      icon: 'people'
    },
    {
      name: 'Inscripciones',
      description: 'Handle student enrollments and course registrations.',
      url: '/dashboard/enrollments',
      icon: 'assignment'
    },
    {
      name: 'Usuarios',
      description: 'Administer user accounts and permissions within the platform.',
      url: '/dashboard/users',
      icon: 'manage_accounts'
    }
    
  ]

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
