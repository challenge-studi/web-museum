import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import Price from '../../models/PriceInterface';
import { CommandService } from '../../services/command.service';
import { provideHttpClient } from '@angular/common/http';
import { BilletterieComponent } from '../pages/billetterie/billetterie.component';

interface PriceWithCount extends Price {
  count: number;
}

describe('BilletterieComponent', () => {
  let component: BilletterieComponent;
  let fixture: ComponentFixture<BilletterieComponent>;
  let httpMock: HttpTestingController;
  let router: Router;
  let commandService: CommandService;

  const mockPrices: Price[] = [
    { id: 1, price: 10, tickets_type: 'Type1' },
    { id: 2, price: 20, tickets_type: 'Type2' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilletterieComponent],
      providers: [
        CommandService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BilletterieComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    commandService = TestBed.inject(CommandService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch prices from API on initialization', async () => {
    const req = httpMock.expectOne('/api/prices');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockPrices });

    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.listPrice.length).toBe(2);
    expect(component.listPrice[0].count).toBe(0);
    expect(component.listPrice[1].count).toBe(0);
  });

  it('should update listPrice and totalPrice when updateListPrice is called', () => {
    component.listPrice = [
      { id: 1, price: 10, tickets_type: 'Type1', count: 0 },
      { id: 2, price: 20, tickets_type: 'Type2', count: 0 },
    ];

    component.updateListPrice(1, 2);

    expect(component.listPrice[0].count).toBe(2);
    expect(component.totalPrice).toBe(20);

    component.updateListPrice(2, 3);

    expect(component.listPrice[1].count).toBe(3);
    expect(component.totalPrice).toBe(80);
  });

  it('should calculate total price correctly', () => {
    component.listPrice = [
      { id: 1, price: 10, tickets_type: 'Type1', count: 2 },
      { id: 2, price: 20, tickets_type: 'Type2', count: 3 },
    ];

    const totalPrice = component.calculTotalPrice();

    expect(totalPrice).toBe(80);
  });

  it('should select an exposition', () => {
    const expo = {
      id: 1,
      name: 'Expo 1',
      description: 'Description of Expo 1',
      departure_date: new Date(),
      end_date: new Date(),
    };
    component.selectExpo(expo);
    expect(component.selectedExposition).toBe(expo);
  });

  it('should submit command when tickets are selected', () => {
    component.selectedExposition = {
      id: 1,
      name: 'Expo 1',
      description: 'Description of Expo 1',
      departure_date: new Date(),
      end_date: new Date(),
    };
    component.listPrice = [
      { id: 1, price: 10, tickets_type: 'Type1', count: 2 },
      { id: 2, price: 20, tickets_type: 'Type2', count: 0 },
    ];

    spyOn(commandService, 'sendCommandToApi').and.returnValue(
      of({
        id: 1,
        documentId: 'DOC123',
        total_price: 20,
        order_date: new Date().toISOString(),
        etat: 'confirmed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        tickets: [{ type: 'Type1', price: 10, quantity: 2 }],
      }),
    );
    spyOn(router, 'navigate');

    component.handleCommandSubmit();

    expect(commandService.sendCommandToApi).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['validation-commande']);
  });

  it('should not submit command when no tickets are selected', () => {
    component.selectedExposition = {
      id: 1,
      name: 'Expo 1',
      description: 'Description of Expo 1',
      departure_date: new Date(),
      end_date: new Date(),
    };
    component.listPrice = [
      { id: 1, price: 10, tickets_type: 'Type1', count: 0 },
      { id: 2, price: 20, tickets_type: 'Type2', count: 0 },
    ];

    spyOn(commandService, 'sendCommandToApi');
    spyOn(router, 'navigate');

    component.handleCommandSubmit();

    expect(commandService.sendCommandToApi).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not submit command when no exposition is selected', () => {
    component.selectedExposition = null;
    component.listPrice = [
      { id: 1, price: 10, tickets_type: 'Type1', count: 2 },
      { id: 2, price: 20, tickets_type: 'Type2', count: 0 },
    ];

    spyOn(commandService, 'sendCommandToApi');
    spyOn(router, 'navigate');

    component.handleCommandSubmit();

    expect(commandService.sendCommandToApi).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should handle errors when submitting command', () => {
    component.selectedExposition = {
      id: 1,
      name: 'Expo 1',
      description: 'Description of Expo 1',
      departure_date: new Date(),
      end_date: new Date(),
    };
    component.listPrice = [
      { id: 1, price: 10, tickets_type: 'Type1', count: 2 },
      { id: 2, price: 20, tickets_type: 'Type2', count: 0 },
    ];

    spyOn(commandService, 'sendCommandToApi').and.returnValue(
      throwError(() => new Error('Error')),
    );
    spyOn(console, 'error');

    component.handleCommandSubmit();

    expect(console.error).toHaveBeenCalledWith(
      "Erreur lors de l'envoi de la commande",
      jasmine.any(Error),
    );
  });
});
