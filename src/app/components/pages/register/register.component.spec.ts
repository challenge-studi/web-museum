import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const form = component.inscriptionForm;
    expect(form.value).toEqual({
      nom: '',
      prenom: '',
      email: '',
      motDePasse: '',
      birthday: '',
    });
  });

  it('should validate the form as invalid when fields are empty', () => {
    expect(component.inscriptionForm.valid).toBeFalse();
  });

  it('should validate the form as valid when all fields are filled', () => {
    component.inscriptionForm.setValue({
      nom: 'Doe',
      prenom: 'John',
      email: 'john.doe@example.com',
      motDePasse: 'password123',
      birthday: '1990-01-01',
    });

    expect(component.inscriptionForm.valid).toBeTrue();
  });

  it('should add a user and reset the form on valid submission', () => {
    component.inscriptionForm.setValue({
      nom: 'Doe',
      prenom: 'John',
      email: 'john.doe@example.com',
      motDePasse: 'password123',
      birthday: '1990-01-01',
    });

    component.onSubmit();

    // Vérifie qu'un utilisateur est ajouté
    expect(component.utilisateurs.length).toBe(1);
    expect(component.utilisateurs[0]).toEqual({
      nom: 'Doe',
      prenom: 'John',
      email: 'john.doe@example.com',
      motDePasse: 'password123',
      birthday: '1990-01-01',
    });

    // Vérifie que le formulaire est réinitialisé
    expect(component.inscriptionForm.value).toEqual({
      nom: null,
      prenom: null,
      email: null,
      motDePasse: null,
      birthday: null,
    });
  });

  it('should not add a user if the form is invalid', () => {
    component.inscriptionForm.setValue({
      nom: '',
      prenom: '',
      email: 'invalid-email',
      motDePasse: '',
      birthday: '',
    });

    component.onSubmit();

    // Vérifie qu'aucun utilisateur n'est ajouté
    expect(component.utilisateurs.length).toBe(0);
  });
});
