import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthUser, LoginCredentials, User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = '/api/users';
  private readonly AUTH_KEY = 'auth_user';

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<AuthUser> {
    return this.http.get<User[]>(this.API_URL).pipe(
      map((users) => {
        const user = users.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
          throw new Error('Email o contraseña incorrectos');
        }

        if (!user.active) {
          throw new Error('Usuario inactivo');
        }

        const authUser: AuthUser = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };

        this.saveUser(authUser);
        return authUser;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }

  getCurrentUser(): AuthUser | null {
    const userStr = localStorage.getItem(this.AUTH_KEY);
    if (!userStr) {
      return null;
    }

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  private saveUser(user: AuthUser): void {
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
  }
}
