import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { DashboardComponent } from './dashboard';
import { Home } from './home/home';
import { SharedModule } from '../../shared/shared-module';


@NgModule({
  declarations: [
    DashboardComponent,
    Home,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
