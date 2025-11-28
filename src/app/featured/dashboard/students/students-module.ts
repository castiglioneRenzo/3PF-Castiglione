import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { StudentsRoutingModule } from './students-routing-module';
import { Students } from './students';
import { StudentsTable } from './students-table/students-table';
import { StudentsForm } from './students-form/students-form';
import { StudentDetail } from './student-detail/student-detail';
import { SharedModule } from '../../../shared/shared-module';

@NgModule({
  declarations: [Students, StudentsTable, StudentsForm, StudentDetail],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
})
export class StudentsModule {}