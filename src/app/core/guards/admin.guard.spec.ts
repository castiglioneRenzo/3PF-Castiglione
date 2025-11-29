import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom } from 'rxjs';
import { adminGuard } from './admin.guard';
import { selectIsAuthenticated, selectIsAdmin } from '../../store/auth/auth.selectors';
import { MessageService } from '../services/message.service';

describe('adminGuard', () => {
  let router: jasmine.SpyObj<Router>;
  let messageService: jasmine.SpyObj<MessageService>;
  let store: MockStore;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const messageSpy = jasmine.createSpyObj('MessageService', ['show']);

    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectIsAuthenticated, value: true },
            { selector: selectIsAdmin, value: false },
          ],
        }),
        { provide: Router, useValue: routerSpy },
        { provide: MessageService, useValue: messageSpy },
      ],
    });

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    store = TestBed.inject(MockStore);
  });

  it('should allow access if user is authenticated and is admin', async () => {
    store.overrideSelector(selectIsAuthenticated, true);
    store.overrideSelector(selectIsAdmin, true);

    const result = await TestBed.runInInjectionContext(async () => {
      const guardResult = adminGuard({} as any, {} as any);
      return await firstValueFrom(guardResult as any);
    });

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
    expect(messageService.show).not.toHaveBeenCalled();
  });

  it('should deny access and redirect to login if user is not authenticated', async () => {
    store.overrideSelector(selectIsAuthenticated, false);
    store.overrideSelector(selectIsAdmin, false);

    const result = await TestBed.runInInjectionContext(async () => {
      const guardResult = adminGuard({} as any, {} as any);
      return await firstValueFrom(guardResult as any);
    });

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
    expect(messageService.show).not.toHaveBeenCalled();
  });

  it('should deny access and show message if user is authenticated but not admin', async () => {
    store.overrideSelector(selectIsAuthenticated, true);
    store.overrideSelector(selectIsAdmin, false);

    const result = await TestBed.runInInjectionContext(async () => {
      const guardResult = adminGuard({} as any, {} as any);
      return await firstValueFrom(guardResult as any);
    });

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(messageService.show).toHaveBeenCalledWith('Debe ser admin para acceder a esta seccion');
  });
});
