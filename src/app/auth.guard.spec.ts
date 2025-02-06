import { TestBed } from '@angular/core/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getTokenJwt']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  const executeGuard = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => TestBed.runInInjectionContext(() => authGuard(route, state));

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true when the user is authenticated', () => {
    // Simuler un utilisateur authentifié
    authService.getTokenJwt.and.returnValue('fake-jwt-token');

    const canActivate = executeGuard(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot,
    );

    expect(canActivate).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should return false and navigate to /auth when the user is not authenticated', () => {
    // Simuler un utilisateur non authentifié
    authService.getTokenJwt.and.returnValue(undefined);

    const canActivate = executeGuard(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot,
    );

    expect(canActivate).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  });
});
