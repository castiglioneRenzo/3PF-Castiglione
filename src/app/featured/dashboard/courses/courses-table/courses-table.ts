import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Course } from '../../../../core/models/course.model';
import * as CoursesActions from '../../../../store/courses/courses.actions';
import { selectAllCourses, selectCoursesLoading } from '../../../../store/courses/courses.selectors';

const courseColumns: string[] = [
  'id',
  'name',
  'description',
  'duration',
  'startDate',
  'endDate',
  'instructor',
  'actions'
];

@Component({
  selector: 'app-courses-table',
  standalone: false,
  templateUrl: './courses-table.html',
  styleUrl: './courses-table.css'
})
export class CoursesTable implements OnInit {
  displayedColumns: string[] = courseColumns;
  dataSource = new MatTableDataSource<Course>([]);
  isLoading$;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly store: Store, private authService: AuthService) {
    this.isLoading$ = this.store.select(selectCoursesLoading);
  }
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses());
    this.store.select(selectAllCourses).subscribe(courses => {
      this.dataSource.data = courses;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
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

  onDeleteCourse(id: number): void {
    this.store.dispatch(CoursesActions.deleteCourse({ id }));
  }
}
