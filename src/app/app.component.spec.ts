import { ActivatedRoute } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let fixture;
  let app: AppComponent;
  let authService: AuthService;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['loadToken']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: { params: of({}) } }, // Mock ActivatedRoute
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should call loadToken on ngOnInit', () => {
    // Appeler ngOnInit
    app.ngOnInit();

    // Vérifier que la méthode loadToken a été appelée
    expect(authService.loadToken).toHaveBeenCalled();
  });
});
