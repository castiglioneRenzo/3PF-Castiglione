import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { EnrollmentsComponent } from './enrollments.component';
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';

const routes: Routes = [
  { path: '', component: EnrollmentsComponent },
  { path: 'new', component: EnrollmentFormComponent },
  { path: ':id/edit', component: EnrollmentFormComponent },
];

@NgModule({
  declarations: [EnrollmentsComponent, EnrollmentFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
})
export class EnrollmentsModule {}
