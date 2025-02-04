import { TestBed } from '@angular/core/testing';

import { CommandService } from './command.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import GET_COMMAND from '../mock/commandes.json';
import User from '../models/UserInterface';
import { AuthService } from './auth.service';
import { devOnlyGuardedExpression } from '@angular/compiler';
import { firstValueFrom } from 'rxjs';
import Commande from '../models/CommandInterface';

describe('CommandService', () => {
  let service: CommandService;
  let httpTesting: HttpTestingController;
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CommandService);
    httpTesting = TestBed.inject(HttpTestingController);
    auth = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCommand should return a command', async () => {
    let user: User = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      birthday: '1970-01-01',
    };

    Object.defineProperty(auth, 'user', { value: user });

    console.log(GET_COMMAND);

    let response$ = service.getCommands();

    const responsePromise = firstValueFrom(response$);

    let req = httpTesting.expectOne(() => true, 'GET command');

    console.log(GET_COMMAND);

    let command: Commande = {
      id: 3,
      total_price: 42,
      order_date: new Date('2025-02-02'),
      status: 'En cours',
    };

    req.flush(GET_COMMAND);

    expect(await responsePromise).toEqual([command]);
  });

  it('get command shoud raise a error if user is not connected', () => {
    expect(() => service.getCommands()).toThrow();
  });

  it('send command ( to modified )', () => {
    expect(service.validateCommand([], 2)).toBe(true);
  });
});
