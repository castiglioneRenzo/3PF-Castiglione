import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';
import * as UsersActions from '../../../store/users/users.actions';
import { selectAllUsers, selectUsersLoading } from '../../../store/users/users.selectors';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  displayedColumns: string[] = ['id', 'email', 'firstName', 'lastName', 'role', 'active', 'actions'];

  constructor(private store: Store) {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUsersLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.store.dispatch(UsersActions.deleteUser({ id }));
    }
  }

  onToggleActive(user: User): void {
    this.store.dispatch(
      UsersActions.updateUser({
        id: user.id,
        user: { active: !user.active },
      })
    );
  }
}
