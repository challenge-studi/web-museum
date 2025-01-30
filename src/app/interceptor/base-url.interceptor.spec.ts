import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { baseUrlInterceptor } from './base-url.interceptor';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

describe('baseUrlInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => baseUrlInterceptor(req, next));

  let service: AuthService;
  let httpTesting: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([baseUrlInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should not modify absolute URLs', async () => {
    const originalUrl = 'https://external-api.com/data';

    firstValueFrom(http.get(originalUrl)).catch(() => {});

    const req = httpTesting.expectOne(originalUrl);
    expect(req.request.url).toBe(originalUrl);
  });

  it('should modify relative URLs by prepending the base URL', async () => {
    const relativeUrl = '/museum';
    const expectedUrl = 'https://dev.remi-ponche.fr/museum';

    firstValueFrom(http.get(relativeUrl)).catch(() => {});

    const req = httpTesting.expectOne(expectedUrl);
    expect(req.request.url).toBe(expectedUrl);
  });

  it('should add Authorization header if token is present', async () => {
    const relativeUrl = 'https://example.com';

    spyOn(service, 'getTokenJwt').and.returnValue('aSuperToken');

    firstValueFrom(http.get(relativeUrl)).catch(() => {});

    const req = httpTesting.expectOne(relativeUrl);
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toBe('Bearer aSuperToken');
  });
});
