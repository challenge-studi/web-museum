import { TestBed } from '@angular/core/testing';
import { CommandService } from './command.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import GET_COMMAND from '../mock/commandes.json';
import { Commande, CommandApi } from '../models/CommandInterface';
import User from '../models/UserInterface';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

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

    let commandApi: CommandApi = {
      id: 3,
      documentId: 'XYZ789',
      total_price: 42,
      order_date: '2025-02-02T00:00:00Z',
      etat: 'En cours',
      createdAt: '2025-02-01T10:00:00Z',
      updatedAt: '2025-02-01T12:00:00Z',
      publishedAt: '2025-02-01T12:00:00Z',
    };

    req.flush({ data: [commandApi], meta: {} });

    const expectedCommande: Commande = {
      id: 3,
      documentId: 'XYZ789',
      total_price: 42,
      order_date: new Date('2025-02-02'),
      status: 'En cours',
    };

    expect(await responsePromise).toEqual([expectedCommande]);

    httpTesting.verify();
  });

  it('getCommand should raise an error if API sends bad format', async () => {
    Object.defineProperty(auth, 'user', { value: user });

    let response$ = service.getCommands();
    const responsePromise = firstValueFrom(response$);

    let req = httpTesting.expectOne(
      () => true,
      'GET command with invalid format',
    );
    req.flush('Salut les lapins');

    await expectAsync(responsePromise).toBeRejected();

    httpTesting.verify();
  });

  it('getCommand should raise an error if user is not connected', () => {
    expect(() => service.getCommands()).toThrow();
  });

  it('send command (to be modified)', () => {
    expect(service.validateCommand([], 2)).toBe(true);
  });

  it('isResponseValide should return true', () => {
    expect(service.isResponseCommandeValide(GET_COMMAND)).toBe(true);
  });

  it('isResponseCommandeValide should return false if invalid format', () => {
    expect(service.isResponseCommandeValide('Une Connnerie')).toBe(false);
  });

  it('sendCommandToApi should raise a error is user is not connected', () => {
    expect(() => service.sendCommandToApi([])).toThrow();
  });

  it('sendCommandToApi shoud return the command', async () => {
    Object.defineProperty(auth, 'user', { value: user });

    let response$ = service.sendCommandToApi([
      { price: 1, quantity: 1, exposition: 1 },
    ]);
    const responsePromise = firstValueFrom(response$);

    const req = httpTesting.expectOne('/api/send-command', 'Send the command');

    req.flush(GET_COMMAND.data[0]);

    expect(await responsePromise).toBeDefined();

    httpTesting.verify();
  });
});
