// import { Injectable } from '@angular/core';
// import { Student } from './model/Student';
// import { MOCK_STUDENTS } from './data/mock';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class StudentsService {
//   private students: Student[] = MOCK_STUDENTS;
//   private studentSubject = new BehaviorSubject<Student[]>([]);
//   students$ = this.studentSubject.asObservable();

//   constructor() {
//     this.studentSubject.next(this.students);
//   }

//   getStudents() {
//     this.studentSubject.next(this.students);
//   }

//   getStudentById(id: number) {
//     return this.students.find(student => student.id === id);
//   }

//   addStudent(student: Student) {
//     const newId = this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
//     student.id = newId;
//     this.students.push(student);
//     this.studentSubject.next(this.students);
//   }

//   updateStudent(updatedStudent: Student) {
//     const index = this.students.findIndex(student => student.id === updatedStudent.id);
//     if (index !== -1) {
//       this.students[index] = updatedStudent;
//       this.studentSubject.next(this.students);
//     }
//   }

//   deleteStudent(id: number) {
//     this.students = this.students.filter(student => student.id !== id);
//     this.studentSubject.next(this.students);
//   }
// }
