import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ConnexionComponent } from './connexion.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { of } from 'rxjs';
import User from '../../../models/UserInterface';

describe('ConnexionComponent', () => {
  let component: ConnexionComponent;
  let fixture: ComponentFixture<ConnexionComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'login',
      'logout',
      'connected$',
    ]);
    authServiceSpy.connected$ = of(false); // Mock the connected$ observable

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ConnexionComponent],
      providers: [
        provideHttpClient(),
        { provide: AuthService, useValue: authServiceSpy },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnexionComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const form = component.connexionForm;
    expect(form.value).toEqual({
      email: '',
      password: '',
    });
  });

  it('should validate the form as invalid when fields are empty', () => {
    expect(component.connexionForm.valid).toBeFalse();
  });

  it('should validate the form as valid when all fields are filled', () => {
    component.connexionForm.setValue({
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(component.connexionForm.valid).toBeTrue();
  });

  it('should call onSubmit and execute login logic if the form is valid', () => {
    const mockUser: User = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      birthday: '1990-01-01',
    };
    authService.login.and.returnValue(of(mockUser));
    spyOn(console, 'log');

    // Utiliser FormBuilder pour créer le formulaire
    const formBuilder = TestBed.inject(FormBuilder);
    component.connexionForm = formBuilder.group({
      email: ['john.doe@example.com', [Validators.required, Validators.email]],
      password: ['password123', [Validators.required]],
    });

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith(
      'john.doe@example.com',
      'password123',
    );
    expect(console.log).toHaveBeenCalledWith('Réponse API : [object Object]');
  });

  it('should call onLogout and execute logout logic', () => {
    component.onLogout();

    expect(authService.logout).toHaveBeenCalled();
  });
});
