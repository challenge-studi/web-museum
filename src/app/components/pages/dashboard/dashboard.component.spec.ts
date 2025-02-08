import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthService } from '../../../services/auth.service';
import User from '../../../models/UserInterface';
import { throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  const mockUser: User = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    birthday: '1970-01-01',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data on init', () => {
    spyOn(authService, 'getUser').and.returnValue(mockUser); // Correction ici pour retourner un Observable

    component.ngOnInit();

    expect(component.user).toEqual(mockUser);
  });

  it('should display error message if new password and confirm password do not match', () => {
    component.newPassword = 'newPassword';
    component.confirmPassword = 'wrongPassword';

    component.onChangePassword();

    expect(component.message).toBe(
      'Vous avez saisi 2 mots de passe differents.',
    );
  });

  it('should change password successfully', async () => {
    // Utiliser la méthode publique pour définir le tokenJWT
    authService.setTokenJWT('aSuperToken');

    component.currentPassword = 'currentPassword';
    component.newPassword = 'newPassword';
    component.confirmPassword = 'newPassword';

    component.onChangePassword();

    const req = httpMock.expectOne('/api/auth/change-password');
    expect(req.request.method).toBe('POST');
    req.flush({ jwt: 'newToken', user: mockUser });

    await fixture.whenStable(); // Attendre que toutes les promesses soient résolues

    expect(component.message).toBe('Votre mot de passe a bien été changé !');
    expect(component.user).toEqual(mockUser);
  });

  it('should handle error when changing password', () => {
    component.currentPassword = 'currentPassword';
    component.newPassword = 'newPassword';
    component.confirmPassword = 'newPassword';

    spyOn(authService, 'changePassword').and.returnValue(
      throwError(() => new Error('Error')),
    );

    component.onChangePassword();

    expect(component.message).toBe('Une erreur est survenue.');
  });
});
