import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let httpTesting: HttpTestingController;
  const DATA_API = {
    jwt: 'theSuperToken',
    user: {
      id: 1,
      documentId: 'theDocumentId',
      username: 'john.doe@example.com',
      email: 'john.doe@example.com',
      provider: 'local',
      confirmed: true,
      blocker: false,
      birthday: '1970-01-01',
      createdAt: '2025-01-29T16:08:20.855Z',
      updatedAt: '2025-01-29T16:08:20.855Z',
      publishedAt: '2025-01-29T16:08:20.699Z',
      firstname: 'John',
      lastname: 'Doe',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegisterComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const form = component.inscriptionForm;
    expect(form.value).toEqual({
      lastname: '',
      firstname: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthday: '',
    });
  });

  it('should validate the form as invalid when fields are empty', () => {
    expect(component.inscriptionForm.valid).toBeFalse();
  });

  it('should validate the form as valid when all fields are filled', () => {
    component.inscriptionForm.setValue({
      lastname: 'Doe',
      firstname: 'John',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      birthday: '1990-01-01',
    });

    expect(component.inscriptionForm.valid).toBeTrue();
  });

  it('should reset the form on valid submission', fakeAsync(() => {
    component.inscriptionForm.setValue({
      lastname: 'Doe',
      firstname: 'John',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      birthday: '1990-01-01',
    });

    component.onSubmit();

    // mock la requete HTTP
    httpTesting.expectOne(() => true).flush(DATA_API);

    // on attend
    tick();

    // Vérifie que le formulaire est réinitialisé
    expect(component.inscriptionForm.value).toEqual({
      lastname: null,
      firstname: null,
      email: null,
      password: null,
      confirmPassword: null,
      birthday: null,
    });
  }));
});
