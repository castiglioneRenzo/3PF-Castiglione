export interface Student {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  edad: number;
  fechaIngreso: Date;
  curso?: string;
}

export const studentColumns: string[] = [
  'id',
  'nombre',
  'apellido',
  'email',
  'edad',
  'fechaIngreso',
  'actions'
];
