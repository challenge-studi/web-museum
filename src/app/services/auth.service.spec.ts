import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('the method logout shoud deleting the token and getToken return the good value', () => {
    Object.defineProperty(service, 'tokenJWT', { value: 'aSuperToken' });

    expect(service.getTokenJwt()).toBe('aSuperToken');

    service.logout();

    expect(service.getTokenJwt()).toBeUndefined();
  });

  it('method login with valid password', async () => {
    const response$ = service.login('admin', 'password');

    // subcripition to the `Observalbe`and create a `Promise` of the response
    const responsePromise = firstValueFrom(response$);

    const req = httpTesting.expectOne('/api/auth/local', 'test request login');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      identifier: 'admin',
      password: 'password',
    });

    // mock the request
    req.flush({
      jwt: 'theSuperToken',
      user: {
        id: 1,
        documentId: 'theDocumentId',
        username: 'john',
        email: 'john.doe@example.com',
        provider: 'local',
        confirmed: true,
        blocker: false,
        birthday: '1970-01-01',
        createdAt: '2025-01-29T16:08:20.855Z',
        updatedAt: '2025-01-29T16:08:20.855Z',
        publishedAt: '2025-01-29T16:08:20.699Z',
      },
    });

    expect(await responsePromise).toEqual({
      jwt: 'theSuperToken',
      user: {
        id: 1,
        documentId: 'theDocumentId',
        username: 'john',
        email: 'john.doe@example.com',
        provider: 'local',
        confirmed: true,
        blocker: false,
        birthday: '1970-01-01',
        createdAt: '2025-01-29T16:08:20.855Z',
        updatedAt: '2025-01-29T16:08:20.855Z',
        publishedAt: '2025-01-29T16:08:20.699Z',
      },
    });

    httpTesting.verify();
  });

  /*--------------------------------------------------------------------------------*/

  it('method register', async () => {
    const response$ = service.register({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      birthday: '1970-01-01',
    });

    // subcripition to the `Observalbe`and create a `Promise` of the response
    const responsePromise = firstValueFrom(response$);

    const req = httpTesting.expectOne(
      '/api/auth/local/register',
      'test request register',
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      username: 'john.doe@example.com',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      birthday: '1970-01-01',
    });

    // mock the request
    req.flush({
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
      },
    });

    expect(await responsePromise).toEqual({
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
      },
    });
    httpTesting.verify();
  });
});
