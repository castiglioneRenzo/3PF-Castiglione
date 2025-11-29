import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NavbarComponent } from './navbar.component';
import { selectIsAdmin } from '../../store/auth/auth.selectors';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectIsAdmin, value: false },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize menu items correctly', () => {
    fixture.detectChanges();

    expect(component.allMenuItems).toBeDefined();
    expect(component.allMenuItems.length).toBe(5);
    expect(component.allMenuItems[0].name).toBe('Inicio');
    expect(component.allMenuItems[1].name).toBe('Alumnos');
    expect(component.allMenuItems[2].name).toBe('Cursos');
    expect(component.allMenuItems[3].name).toBe('Inscripciones');
    expect(component.allMenuItems[4].name).toBe('Usuarios');
  });

  it('should mark Usuarios menu item as adminOnly', () => {
    fixture.detectChanges();

    const usuariosItem = component.allMenuItems.find(
      (item) => item.name === 'Usuarios'
    );
    expect(usuariosItem?.adminOnly).toBeTrue();
  });

  it('should set isAdmin$ observable from store', () => {
    store.overrideSelector(selectIsAdmin, true);
    
    fixture.detectChanges();

    component.isAdmin$.subscribe((isAdmin) => {
      expect(isAdmin).toBeTrue();
    });
  });

  it('should have correct routes for menu items', () => {
    fixture.detectChanges();

    expect(component.allMenuItems[0].route).toBe('/dashboard');
    expect(component.allMenuItems[1].route).toBe('/dashboard/students');
    expect(component.allMenuItems[2].route).toBe('/dashboard/courses');
    expect(component.allMenuItems[3].route).toBe('/dashboard/enrollments');
    expect(component.allMenuItems[4].route).toBe('/dashboard/users');
  });

  it('should update isAdmin$ when store state changes', () => {
    fixture.detectChanges();

    store.overrideSelector(selectIsAdmin, false);
    store.refreshState();

    component.isAdmin$.subscribe((isAdmin) => {
      expect(isAdmin).toBeFalse();
    });

    store.overrideSelector(selectIsAdmin, true);
    store.refreshState();

    component.isAdmin$.subscribe((isAdmin) => {
      expect(isAdmin).toBeTrue();
    });
  });

  it('should only have one admin-only menu item', () => {
    fixture.detectChanges();

    const adminOnlyItems = component.allMenuItems.filter(
      (item) => item.adminOnly === true
    );
    expect(adminOnlyItems.length).toBe(1);
  });
});
