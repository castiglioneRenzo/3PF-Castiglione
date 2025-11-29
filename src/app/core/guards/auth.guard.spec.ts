import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom } from 'rxjs';
import { authGuard } from './auth.guard';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';

describe('authGuard', () => {
  let router: jasmine.SpyObj<Router>;
  let store: MockStore;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectIsAuthenticated, value: false },
          ],
        }),
        { provide: Router, useValue: routerSpy },
      ],
    });

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    store = TestBed.inject(MockStore);
  });

  it('should allow access if user is authenticated', async () => {
    store.overrideSelector(selectIsAuthenticated, true);

    const result = await TestBed.runInInjectionContext(async () => {
      const guardResult = authGuard({} as any, {} as any);
      return await firstValueFrom(guardResult as any);
    });

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and redirect to login if user is not authenticated', async () => {
    store.overrideSelector(selectIsAuthenticated, false);

    const result = await TestBed.runInInjectionContext(async () => {
      const guardResult = authGuard({} as any, {} as any);
      return await firstValueFrom(guardResult as any);
    });

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });
});
