import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import User from '../models/UserInterface';

describe('AuthService', () => {
  let service: AuthService;
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

  const DATA_USER: User = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    birthday: '1970-01-01',
  };

  const DATA_BAD_PASSWORD = {
    data: null,
    error: {
      status: 400,
      name: 'ValidationError',
      message: 'Invalid identifier or password',
      details: {},
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
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
    req.flush(DATA_API);

    expect(await responsePromise).toEqual(DATA_USER);

    httpTesting.verify();
  });

  it('wrong password should throw a error', async () => {
    const response$ = service.login('admin', 'badPassword');

    // subcripition to the `Observalbe`and create a `Promise` of the response
    const responsePromise = firstValueFrom(response$);

    const req = httpTesting.expectOne(
      '/api/auth/local',
      'test request login with bad password',
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      identifier: 'admin',
      password: 'badPassword',
    });

    req.flush(DATA_BAD_PASSWORD);

    responsePromise.catch((error) =>
      expect(error.message).toBe('Login Invalid'),
    );

    httpTesting.verify();
  });

  it('method register', async () => {
    const response$ = service.register(
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        birthday: '1970-01-01',
      },
      'password',
    );

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
      birthday: new Date('1970-01-01'),
    });

    req.flush(DATA_API);

    expect(await responsePromise).toEqual(DATA_USER);
    httpTesting.verify();
  });
});
