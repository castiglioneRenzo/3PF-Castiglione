import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

// Routing
import { AlumnosRoutingModule } from './alumnos-routing.module';

// Components
import { AlumnosComponent } from './alumnos.component';
import { AlumnosListaComponent } from './alumnos-lista/alumnos-lista.component';
import { AlumnoFormComponent } from './alumnos-form/alumnos-form.component';

// Pipes y Directivas (importar desde el shared o app)
import { NombreCompletoPipe } from '../pipes/nombre-completo.pipe';
import { TitleSizeDirective } from '../directives/title-size.directive';

@NgModule({
  declarations: [
    AlumnosComponent,
    AlumnosListaComponent,
    AlumnoFormComponent,
    NombreCompletoPipe,
    TitleSizeDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlumnosRoutingModule,
    // Angular Material
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class AlumnosModule { }