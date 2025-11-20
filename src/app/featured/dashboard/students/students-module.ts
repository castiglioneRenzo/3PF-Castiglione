import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing-module';
import { Students } from './students';
import { StudentsTable } from './students-table/students-table';
import { StudentsForm } from './students-form/students-form';
import { SharedModule } from '../../../shared/shared-module';

@NgModule({
  declarations: [Students, StudentsTable, StudentsForm],
  imports: [CommonModule, StudentsRoutingModule, SharedModule],
})
export class StudentsModule {}