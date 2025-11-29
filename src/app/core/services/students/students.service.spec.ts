import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudentsService } from './students.service';
import { Student, CreateStudentDto, UpdateStudentDto } from '../../models/student.model';

describe('StudentsService', () => {
  let service: StudentsService;
  let httpMock: HttpTestingController;

  const mockStudents: Student[] = [
    {
      id: '1',
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan@test.com',
      phone: '1234567890',
      address: 'Calle 123',
      birthDate: '2000-01-01',
      enrollmentDate: '2024-01-01',
      active: true,
    },
    {
      id: '2',
      firstName: 'María',
      lastName: 'González',
      email: 'maria@test.com',
      phone: '0987654321',
      address: 'Avenida 456',
      birthDate: '1999-05-15',
      enrollmentDate: '2024-02-01',
      active: true,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentsService],
    });
    service = TestBed.inject(StudentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return all students', (done) => {
      service.getAll().subscribe({
        next: (students) => {
          expect(students).toEqual(mockStudents);
          expect(students.length).toBe(2);
          done();
        },
      });

      const req = httpMock.expectOne('/api/students');
      expect(req.request.method).toBe('GET');
      req.flush(mockStudents);
    });

    it('should handle error when getting all students', (done) => {
      service.getAll().subscribe({
        error: (error) => {
          expect(error).toBeDefined();
          done();
        },
      });

      const req = httpMock.expectOne('/api/students');
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('getById', () => {
    it('should return a student by id', (done) => {
      const studentId = '1';

      service.getById(studentId).subscribe({
        next: (student) => {
          expect(student).toEqual(mockStudents[0]);
          expect(student.id).toBe(studentId);
          done();
        },
      });

      const req = httpMock.expectOne(`/api/students/${studentId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockStudents[0]);
    });

    it('should handle numeric id', (done) => {
      const studentId = 1;

      service.getById(studentId).subscribe({
        next: (student) => {
          expect(student).toBeDefined();
          done();
        },
      });

      const req = httpMock.expectOne(`/api/students/${studentId}`);
      req.flush(mockStudents[0]);
    });
  });

  describe('create', () => {
    it('should create a new student', (done) => {
      const newStudent: CreateStudentDto = {
        firstName: 'Carlos',
        lastName: 'Rodríguez',
        email: 'carlos@test.com',
        phone: '5555555555',
        address: 'Boulevard 789',
        birthDate: '2001-03-20',
      };

      const createdStudent: Student = {
        id: '3',
        ...newStudent,
        enrollmentDate: '2024-03-01',
        active: true,
      };

      service.create(newStudent).subscribe({
        next: (student) => {
          expect(student).toEqual(createdStudent);
          expect(student.id).toBe('3');
          done();
        },
      });

      const req = httpMock.expectOne('/api/students');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newStudent);
      req.flush(createdStudent);
    });
  });

  describe('update', () => {
    it('should update an existing student', (done) => {
      const studentId = '1';
      const updates: UpdateStudentDto = {
        firstName: 'Juan Updated',
        phone: '9999999999',
      };

      const updatedStudent: Student = {
        ...mockStudents[0],
        ...updates,
      };

      service.update(studentId, updates).subscribe({
        next: (student) => {
          expect(student.firstName).toBe('Juan Updated');
          expect(student.phone).toBe('9999999999');
          done();
        },
      });

      const req = httpMock.expectOne(`/api/students/${studentId}`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(updates);
      req.flush(updatedStudent);
    });

    it('should handle numeric id for update', (done) => {
      const studentId = 1;
      const updates: UpdateStudentDto = { active: false };

      service.update(studentId, updates).subscribe({
        next: (student) => {
          expect(student).toBeDefined();
          done();
        },
      });

      const req = httpMock.expectOne(`/api/students/${studentId}`);
      req.flush({ ...mockStudents[0], active: false });
    });
  });

  describe('delete', () => {
    it('should delete a student', (done) => {
      const studentId = '1';

      service.delete(studentId).subscribe({
        next: () => {
          expect().nothing();
          done();
        },
      });

      const req = httpMock.expectOne(`/api/students/${studentId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });

    it('should handle numeric id for delete', (done) => {
      const studentId = 2;

      service.delete(studentId).subscribe({
        next: () => {
          expect().nothing();
          done();
        },
      });

      const req = httpMock.expectOne(`/api/students/${studentId}`);
      req.flush({});
    });

    it('should handle error when deleting', (done) => {
      const studentId = '999';

      service.delete(studentId).subscribe({
        error: (error) => {
          expect(error).toBeDefined();
          done();
        },
      });

      const req = httpMock.expectOne(`/api/students/${studentId}`);
      req.error(new ProgressEvent('Not found'));
    });
  });
});
