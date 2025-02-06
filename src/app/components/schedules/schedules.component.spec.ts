import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulesComponent } from './schedules.component';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

describe('SchedulesComponent', () => {
  let component: SchedulesComponent;
  let fixture: ComponentFixture<SchedulesComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulesComponent],
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulesComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify(); // Vérifie qu'il n'y a pas de requêtes HTTP en attente
  });

  it('should create', () => {
    fixture.detectChanges(); // Appelle ngOnInit
    const req = httpMock.expectOne('/api/horaires');
    req.flush({ data: [] }); // Fournir une réponse mockée pour éviter les requêtes ouvertes
    expect(component).toBeTruthy();
  });

  it('should fetch schedules on init', () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          day_of_week: 'Monday',
          opening_time: '09:00:00',
          closing_time: '17:00:00',
        },
        {
          id: 2,
          day_of_week: 'Tuesday',
          opening_time: '09:00:00',
          closing_time: '17:00:00',
        },
      ],
    };

    fixture.detectChanges(); // Appelle ngOnInit

    const req = httpMock.expectOne('/api/horaires');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(component.horaires.length).toBe(2);
    expect(component.horaires[0].day_of_week).toBe('Monday');
    expect(component.horaires[0].opening_time).toBe('09:00');
    expect(component.horaires[0].closing_time).toBe('17:00');
  });

  it('should format time correctly', () => {
    // Pas besoin d'appeler ngOnInit ici, donc pas de requête HTTP attendue
    expect(component.formatTime('09:00:00')).toBe('09:00');
    expect(component.formatTime('17:30:00')).toBe('17:30');
    expect(component.formatTime('')).toBe(''); // Utiliser une chaîne vide au lieu de null
  });
});
