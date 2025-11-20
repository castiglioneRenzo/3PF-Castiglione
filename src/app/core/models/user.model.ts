export type UserRole = 'admin' | 'user';

export interface User {
  id: number;
  email: string;
  password?: string; // No se debe enviar al frontend en producción
  firstName: string;
  lastName: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  token?: string;
}
