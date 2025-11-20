import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, CreateCourseDto, UpdateCourseDto } from '../../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API_URL = '/api/courses';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API_URL);
  }

  getById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.API_URL}/${id}`);
  }

  create(course: CreateCourseDto): Observable<Course> {
    const newCourse = {
      ...course,
      active: true,
    };
    return this.http.post<Course>(this.API_URL, newCourse);
  }

  update(id: number, course: UpdateCourseDto): Observable<Course> {
    return this.http.patch<Course>(`${this.API_URL}/${id}`, course);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
