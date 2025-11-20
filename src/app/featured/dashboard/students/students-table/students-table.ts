import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Student } from '../../../../core/models/student.model';
import * as StudentsActions from '../../../../store/students/students.actions';
import { selectAllStudents, selectStudentsLoading } from '../../../../store/students/students.selectors';

const studentColumns: string[] = [
  'id',
  'firstName',
  'lastName',
  'email',
  'phone',
  'enrollmentDate',
  'actions'
];

@Component({
  selector: 'app-students-table',
  standalone: false,
  templateUrl: './students-table.html',
  styleUrl: './students-table.css'
})
export class StudentsTable implements OnInit {
  displayedColumns: string[] = studentColumns;
  dataSource = new MatTableDataSource<Student>([]);
  isLoading$;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly store: Store) {
    this.isLoading$ = this.store.select(selectStudentsLoading);
    this.store.select(selectAllStudents).subscribe(students => {
      this.dataSource.data = students;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(StudentsActions.loadStudents());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteStudent(id: number): void {
    this.store.dispatch(StudentsActions.deleteStudent({ id }));
  }
}
