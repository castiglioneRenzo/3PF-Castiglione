import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, CreateStudentDto, UpdateStudentDto } from '../../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private readonly API_URL = '/api/students';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.API_URL);
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.API_URL}/${id}`);
  }

  create(student: CreateStudentDto): Observable<Student> {
    const newStudent = {
      ...student,
      enrollmentDate: new Date().toISOString().split('T')[0],
      active: true,
    };
    return this.http.post<Student>(this.API_URL, newStudent);
  }

  update(id: number, student: UpdateStudentDto): Observable<Student> {
    return this.http.patch<Student>(`${this.API_URL}/${id}`, student);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
