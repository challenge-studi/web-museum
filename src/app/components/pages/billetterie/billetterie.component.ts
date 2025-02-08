import { Component } from '@angular/core';
import { ButtonComponent } from '../../ux/button/button.component';
import { CheckinTicketComponent } from '../../ux/checkin-ticket/checkin-ticket.component';
import Price from '../../../models/PriceInterface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exposition } from '../../../models/ExpositionInterface';
import expoData from '../../../mock/exposition.json';
import { CommonModule } from '@angular/common';

interface ApiResponse {
  data: PriceApi[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface PriceApi {
  id: number;
  documentId: string;
  price: number;
  tickets_type: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: any;
  updatedBy: any;
  locale: string;
  localizations: any[];
}

type PriceWithCount = Price & { count: number };

@Component({
  selector: 'app-billetterie',
  imports: [ButtonComponent, CheckinTicketComponent, CommonModule],
  templateUrl: './billetterie.component.html',
  styleUrl: './billetterie.component.css',
})
export class BilletterieComponent {
  public listPrice: PriceWithCount[] = [];
  public totalPrice: number = 0;
  private readonly apiUrl = '/api/prices';
  public expositions: Exposition[] = expoData.map((expo) => ({
    ...expo,
    departure_date: new Date(expo.departure_date),
    end_date: new Date(expo.end_date),
  }));
  public selectedExposition!: Exposition | null;

  constructor(private readonly http: HttpClient) {
    this.getPrices().subscribe((response: ApiResponse) => {
      console.log('Response from API:', response);

      const prices = response.data;

      if (Array.isArray(prices)) {
        console.log('Prices from API:', prices);
        this.listPrice = prices.map((price: Price) => ({ ...price, count: 0 }));
        console.log('Mapped prices:', this.listPrice);
      } else {
        console.error('Expected an array of prices but got:', prices);
      }
    });
  }
  getPrices(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  updateListPrice(id: number, newCount: number) {
    this.listPrice = this.listPrice.map((item) => {
      if (item.id === id) {
        const newItem = { ...item, count: newCount };
        return newItem;
      } else {
        return item;
      }
    });
    this.totalPrice = this.calculTotalPrice();
    console.log('Updated listPrice:', this.listPrice);
  }
  calculTotalPrice() {
    return this.listPrice.reduce(
      (sum, itemCurrent) => sum + itemCurrent.price * itemCurrent.count,
      0,
    );
  }
  selectExpo(expo: Exposition) {
    this.selectedExposition = expo;
  }
}
