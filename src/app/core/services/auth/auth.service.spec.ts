import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { AuthUser, LoginCredentials, User } from '../../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    {
      id: '1',
      email: 'admin@test.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      active: true,
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      email: 'user@test.com',
      password: 'user123',
      firstName: 'Regular',
      lastName: 'User',
      role: 'user',
      active: true,
      createdAt: '2024-01-02',
    },
    {
      id: '3',
      email: 'inactive@test.com',
      password: 'pass123',
      firstName: 'Inactive',
      lastName: 'User',
      role: 'user',
      active: false,
      createdAt: '2024-01-03',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', (done) => {
      const credentials: LoginCredentials = {
        email: 'admin@test.com',
        password: 'admin123',
      };

      service.login(credentials).subscribe({
        next: (authUser) => {
          expect(authUser).toBeDefined();
          expect(authUser.email).toBe('admin@test.com');
          expect(authUser.firstName).toBe('Admin');
          expect(authUser.role).toBe('admin');
          expect(authUser.id).toBe('1');
          done();
        },
      });

      const req = httpMock.expectOne('/api/users');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });

    it('should throw error with invalid credentials', (done) => {
      const credentials: LoginCredentials = {
        email: 'wrong@test.com',
        password: 'wrongpass',
      };

      service.login(credentials).subscribe({
        error: (error) => {
          expect(error.message).toBe('Email o contraseña incorrectos');
          done();
        },
      });

      const req = httpMock.expectOne('/api/users');
      req.flush(mockUsers);
    });

    it('should throw error for inactive user', (done) => {
      const credentials: LoginCredentials = {
        email: 'inactive@test.com',
        password: 'pass123',
      };

      service.login(credentials).subscribe({
        error: (error) => {
          expect(error.message).toBe('Usuario inactivo');
          done();
        },
      });

      const req = httpMock.expectOne('/api/users');
      req.flush(mockUsers);
    });

    it('should save user to localStorage on successful login', (done) => {
      const credentials: LoginCredentials = {
        email: 'user@test.com',
        password: 'user123',
      };

      service.login(credentials).subscribe({
        next: () => {
          const savedUser = localStorage.getItem('auth_user');
          expect(savedUser).toBeTruthy();
          const parsedUser = JSON.parse(savedUser!);
          expect(parsedUser.email).toBe('user@test.com');
          done();
        },
      });

      const req = httpMock.expectOne('/api/users');
      req.flush(mockUsers);
    });
  });

  describe('logout', () => {
    it('should remove user from localStorage', () => {
      const mockUser: AuthUser = {
        id: '1',
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'user',
      };
      localStorage.setItem('auth_user', JSON.stringify(mockUser));

      service.logout();

      expect(localStorage.getItem('auth_user')).toBeNull();
    });
  });

  describe('getCurrentUser', () => {
    it('should return user from localStorage', () => {
      const mockUser: AuthUser = {
        id: '1',
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'admin',
      };
      localStorage.setItem('auth_user', JSON.stringify(mockUser));

      const user = service.getCurrentUser();

      expect(user).toEqual(mockUser);
    });

    it('should return null if no user in localStorage', () => {
      const user = service.getCurrentUser();
      expect(user).toBeNull();
    });

    it('should return null if localStorage has invalid JSON', () => {
      localStorage.setItem('auth_user', 'invalid json');
      const user = service.getCurrentUser();
      expect(user).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if user exists in localStorage', () => {
      const mockUser: AuthUser = {
        id: '1',
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'user',
      };
      localStorage.setItem('auth_user', JSON.stringify(mockUser));

      expect(service.isAuthenticated()).toBe(true);
    });

    it('should return false if no user in localStorage', () => {
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('isAdmin', () => {
    it('should return true if user role is admin', () => {
      const mockUser: AuthUser = {
        id: '1',
        email: 'admin@test.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
      };
      localStorage.setItem('auth_user', JSON.stringify(mockUser));

      expect(service.isAdmin()).toBe(true);
    });

    it('should return false if user role is not admin', () => {
      const mockUser: AuthUser = {
        id: '1',
        email: 'user@test.com',
        firstName: 'Regular',
        lastName: 'User',
        role: 'user',
      };
      localStorage.setItem('auth_user', JSON.stringify(mockUser));

      expect(service.isAdmin()).toBe(false);
    });

    it('should return false if no user in localStorage', () => {
      expect(service.isAdmin()).toBe(false);
    });
  });
});
