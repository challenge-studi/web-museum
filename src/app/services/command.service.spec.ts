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
  let user: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CommandService);
    httpTesting = TestBed.inject(HttpTestingController);
    auth = TestBed.inject(AuthService);
    user = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      birthday: '1970-01-01',
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCommand should return a command', async () => {
    Object.defineProperty(auth, 'user', { value: user });

    let response$ = service.getCommands();

    const responsePromise = firstValueFrom(response$);

    let req = httpTesting.expectOne(() => true, 'GET command');

    let command: Commande = {
      id: 3,
      total_price: 42,
      order_date: new Date('2025-02-02'),
      status: 'En cours',
    };

    req.flush(GET_COMMAND);

    expect(await responsePromise).toEqual([command]);
  });

  it('getCommand should raise a error if api send bad format', async () => {
    Object.defineProperty(auth, 'user', { value: user });

    let response$ = service.getCommands();

    const responsePromise = firstValueFrom(response$);

    let req = httpTesting.expectOne(
      () => true,
      'GET command with invalid format',
    );

    req.flush('Salut les lapin');

    responsePromise.catch((error) => expect(error).toBeDefined);
  });

  it('get command shoud raise a error if user is not connected', () => {
    expect(() => service.getCommands()).toThrow();
  });

  it('send command ( to modified )', () => {
    expect(service.validateCommand([], 2)).toBe(true);
  });

  it('isResponseValide shoud return true', () => {
    expect(service.isResponseCommandeValide(GET_COMMAND)).toBe(true);
  });

  it('isResponseCommandeValide should return false if invalid format', () => {
    expect(service.isResponseCommandeValide('Une Connnerie')).toBe(false);
  });
});
