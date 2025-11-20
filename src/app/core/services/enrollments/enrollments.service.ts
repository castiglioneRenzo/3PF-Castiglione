import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Enrollment,
  CreateEnrollmentDto,
  UpdateEnrollmentDto,
} from '../../models/enrollment.model';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentsService {
  private readonly API_URL = '/api/enrollments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.API_URL);
  }

  getById(id: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.API_URL}/${id}`);
  }

  getByStudentId(studentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.API_URL}?studentId=${studentId}`);
  }

  getByCourseId(courseId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.API_URL}?courseId=${courseId}`);
  }

  create(enrollment: CreateEnrollmentDto): Observable<Enrollment> {
    const newEnrollment = {
      ...enrollment,
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'active',
      grade: null,
      notes: enrollment.notes || '',
    };
    return this.http.post<Enrollment>(this.API_URL, newEnrollment);
  }

  update(id: number, enrollment: UpdateEnrollmentDto): Observable<Enrollment> {
    return this.http.patch<Enrollment>(`${this.API_URL}/${id}`, enrollment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
