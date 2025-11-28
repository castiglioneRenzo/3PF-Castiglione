import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { Home } from './home/home';

import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'courses',
        loadChildren: () => import('./courses/courses-module').then((m) => m.CoursesModule),
      },
      {
        path: 'students',
        loadChildren: () => import('./students/students-module').then((m) => m.StudentsModule),
      },
      {
        path: 'enrollments',
        loadChildren: () =>
          import('./enrollments/enrollments.module').then((m) => m.EnrollmentsModule),
      },
      {
        path: 'users',
        canActivate: [adminGuard],
        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}