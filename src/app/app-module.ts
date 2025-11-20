import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './store';
import { AuthEffects } from './store/auth/auth.effects';
import { StudentsEffects } from './store/students/students.effects';
import { CoursesEffects } from './store/courses/courses.effects';
import { EnrollmentsEffects } from './store/enrollments/enrollments.effects';
import { UsersEffects } from './store/users/users.effects';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

// Components
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { SharedModule } from './shared/shared-module';

@NgModule({
  declarations: [
    App,
    NavbarComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    // NgRx Store
    StoreModule.forRoot(ROOT_REDUCERS),
    EffectsModule.forRoot([
      AuthEffects,
      StudentsEffects,
      CoursesEffects,
      EnrollmentsEffects,
      UsersEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),
    // Angular Material Modules
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  MatDividerModule,
  MatSnackBarModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [App]
})
export class AppModule { }
