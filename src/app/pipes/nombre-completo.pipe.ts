import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreCompleto',
  standalone: false
})
export class NombreCompletoPipe implements PipeTransform {
  transform(nombre: string, apellido: string): string {
    if (!nombre && !apellido) {
      return '';
    }
    return `${nombre || ''} ${apellido || ''}`.trim();
  }
}