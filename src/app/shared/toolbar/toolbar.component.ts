import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, merge, of } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { selectUserFullName, selectAuthUser } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  standalone: false
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();
  
  pageTitle$!: Observable<string>;
  userFullName$: Observable<string>;
  userEmail$: Observable<string>;
  
  private destroy$ = new Subject<void>();
  private routeTitles: { [key: string]: string } = {
    '/dashboard': 'Inicio',
    '/dashboard/home': 'Inicio',
    '/dashboard/students': 'Estudiantes',
    '/dashboard/courses': 'Cursos',
    '/dashboard/enrollments': 'Inscripciones',
    '/dashboard/users': 'Usuarios',
  };

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.userFullName$ = this.store.select(selectUserFullName);
    this.userEmail$ = this.store.select(selectAuthUser).pipe(
      map(user => user?.email || '')
    );
  }

  ngOnInit(): void {
    const initialTitle = this.getPageTitle(this.router.url);
    
    this.pageTitle$ = merge(
      of(initialTitle),
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.getPageTitle(this.router.url))
      )
    ).pipe(takeUntil(this.destroy$));
  }

  private getPageTitle(url: string): string {
    // Intentar match exacto
    if (this.routeTitles[url]) {
      return this.routeTitles[url];
    }

    // Intentar match por prefijo para rutas dinamicas
    for (const route in this.routeTitles) {
      if (url.startsWith(route)) {
        // Detectar si es detalle, edicion o creacion
        if (url.includes('/edit/')) {
          return `Editar ${this.routeTitles[route]}`;
        } else if (url.endsWith('/new') || url.endsWith('/create')) {
          return `Crear ${this.routeTitles[route]}`;
        } else if (url !== route) {
          return `Detalle de ${this.routeTitles[route]}`;
        }
        return this.routeTitles[route];
      }
    }

    return 'Sistema de Gestion';
  }

  onMenuToggle() {
    this.menuToggle.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
