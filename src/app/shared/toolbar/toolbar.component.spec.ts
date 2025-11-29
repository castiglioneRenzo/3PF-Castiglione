import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Subject } from 'rxjs';
import { ToolbarComponent } from './toolbar.component';
import { selectUserFullName, selectAuthUser } from '../../store/auth/auth.selectors';
import { User } from '../../core/models/user.model';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let store: MockStore;
  let router: jasmine.SpyObj<Router>;
  let routerEventsSubject: Subject<any>;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    password: 'test123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'user',
    active: true,
    createdAt: '2024-01-01'
  };

  beforeEach(async () => {
    routerEventsSubject = new Subject();
    const routerSpy = jasmine.createSpyObj('Router', ['navigate'], {
      events: routerEventsSubject.asObservable(),
      url: '/dashboard'
    });

    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectUserFullName, value: 'John Doe' },
            { selector: selectAuthUser, value: mockUser },
          ],
        }),
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userFullName$ from store', (done) => {
    fixture.detectChanges();

    component.userFullName$.subscribe((name) => {
      expect(name).toBe('John Doe');
      done();
    });
  });

  it('should initialize userEmail$ from store', (done) => {
    fixture.detectChanges();

    component.userEmail$.subscribe((email) => {
      expect(email).toBe('test@example.com');
      done();
    });
  });

  it('should set initial page title based on current route', (done) => {
    fixture.detectChanges();

    component.pageTitle$.subscribe((title) => {
      expect(title).toBe('Inicio');
      done();
    });
  });

  it('should update page title on navigation to students', (done) => {
    Object.defineProperty(router, 'url', { value: '/dashboard/students', writable: true });
    
    fixture.detectChanges();

    routerEventsSubject.next(new NavigationEnd(1, '/dashboard/students', '/dashboard/students'));

    component.pageTitle$.subscribe((title) => {
      if (title === 'Estudiantes') {
        expect(title).toBe('Estudiantes');
        done();
      }
    });
  });

  it('should update page title on navigation to courses', (done) => {
    Object.defineProperty(router, 'url', { value: '/dashboard/courses', writable: true });
    
    fixture.detectChanges();

    routerEventsSubject.next(new NavigationEnd(2, '/dashboard/courses', '/dashboard/courses'));

    component.pageTitle$.subscribe((title) => {
      if (title === 'Cursos') {
        expect(title).toBe('Cursos');
        done();
      }
    });
  });

  it('should emit menuToggle event when onMenuToggle is called', () => {
    spyOn(component.menuToggle, 'emit');
    
    component.onMenuToggle();
    
    expect(component.menuToggle.emit).toHaveBeenCalled();
  });

  it('should return "Editar Estudiantes" for edit routes', (done) => {
    Object.defineProperty(router, 'url', { value: '/dashboard/students/edit/1', writable: true });
    
    fixture.detectChanges();

    routerEventsSubject.next(
      new NavigationEnd(3, '/dashboard/students/edit/1', '/dashboard/students/edit/1')
    );

    component.pageTitle$.subscribe((title) => {
      if (title.includes('Editar')) {
        expect(title).toBe('Editar Estudiantes');
        done();
      }
    });
  });

  it('should return "Crear Inscripciones" for new routes', (done) => {
    Object.defineProperty(router, 'url', { value: '/dashboard/enrollments/new', writable: true });
    
    fixture.detectChanges();

    routerEventsSubject.next(
      new NavigationEnd(4, '/dashboard/enrollments/new', '/dashboard/enrollments/new')
    );

    component.pageTitle$.subscribe((title) => {
      if (title.includes('Crear')) {
        expect(title).toBe('Crear Inscripciones');
        done();
      }
    });
  });

  it('should return "Sistema de Gestion" for unknown routes', (done) => {
    Object.defineProperty(router, 'url', { value: '/unknown', writable: true });
    
    fixture.detectChanges();

    routerEventsSubject.next(new NavigationEnd(5, '/unknown', '/unknown'));

    component.pageTitle$.subscribe((title) => {
      if (title === 'Sistema de Gestion') {
        expect(title).toBe('Sistema de Gestion');
        done();
      }
    });
  });

  it('should unsubscribe on ngOnDestroy', () => {
    fixture.detectChanges();

    const destroySpy = spyOn(component['destroy$'], 'next');
    const completespy = spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completespy).toHaveBeenCalled();
  });
});
