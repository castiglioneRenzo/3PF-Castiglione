// import { Injectable } from '@angular/core';
// import { Course } from './model/Course';
// import { MOCK_COURSES } from './data/mock';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CoursesService {
//   private courses: Course[] = MOCK_COURSES;
//   private courseSubject = new BehaviorSubject<Course[]>([]);
//   courses$ = this.courseSubject.asObservable();

//   constructor() {
//     this.courseSubject.next(this.courses);
//   }

//   getCourses() {
//     this.courseSubject.next(this.courses);    
//   }

//   getCourseById(id: number) {
//     return this.courses.find(course => course.id === id);
//   }

//   addCourse(course: Course) {
//     const newId = this.courses.length > 0 ? Math.max(...this.courses.map(c => c.id)) + 1 : 1;
//     course.id = newId;
//     this.courses.push(course);
//     this.courseSubject.next(this.courses);
//   }

//   updateCourse(updatedCourse: Course) {
//     const index = this.courses.findIndex(course => course.id === updatedCourse.id);
//     if (index !== -1) {
//       this.courses[index] = updatedCourse;
//       this.courseSubject.next(this.courses);
//     }
//   }

//   deleteCourse(id: number) {
//     this.courses = this.courses.filter(course => course.id !== id);
//     this.courseSubject.next(this.courses);
//   }
// }
