import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BilletterieComponent } from './billetterie.component';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import Price from '../../../models/PriceInterface';

interface PriceWithCount extends Price {
  count: number;
}

describe('BilletterieComponent', () => {
  let component: BilletterieComponent;
  let fixture: ComponentFixture<BilletterieComponent>;
  let httpMock: HttpTestingController;

  const mockPrices: Price[] = [
    {
      id: 1,
      price: 10,
      tickets_type: 'Type1',
    },
    {
      id: 2,
      price: 20,
      tickets_type: 'Type2',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilletterieComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(BilletterieComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
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
      {
        id: 1,
        price: 10,
        tickets_type: 'Type1',
        count: 0,
      },
      {
        id: 2,
        price: 20,
        tickets_type: 'Type2',
        count: 0,
      },
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
      {
        id: 1,
        price: 10,
        tickets_type: 'Type1',
        count: 2,
      },
      {
        id: 2,
        price: 20,
        tickets_type: 'Type2',
        count: 3,
      },
    ];

    const totalPrice = component.calculTotalPrice();

    expect(totalPrice).toBe(80);
  });
});
