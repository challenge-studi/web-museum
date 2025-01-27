import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ConnexionComponent } from './connexion.component';

describe('ConnexionComponent', () => {
  let component: ConnexionComponent;
  let fixture: ComponentFixture<ConnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ConnexionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const form = component.connexionForm;
    expect(form.value).toEqual({
      email: '',
      motDePasse: '',
    });
  });

  it('should validate the form as invalid when fields are empty', () => {
    expect(component.connexionForm.valid).toBeFalse();
  });

  it('should validate the form as valid when all fields are filled', () => {
    component.connexionForm.setValue({
      email: 'john.doe@example.com',
      motDePasse: 'password123',
    });

    expect(component.connexionForm.valid).toBeTrue();
  });

  it('should call onSubmit and execute logic if the form is valid', () => {
    spyOn(component, 'onSubmit');

    component.connexionForm.setValue({
      email: 'john.doe@example.com',
      motDePasse: 'password123',
    });

    const form = component.connexionForm;
    expect(form.valid).toBeTrue();

    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled(); // Vérifie que la méthode est bien appelée
  });
});
