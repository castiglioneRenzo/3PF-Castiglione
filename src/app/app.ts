import { Component, signal, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('1PF-Castiglione');

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.checkAuth());
  }
}
