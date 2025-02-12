import { CommandService } from './../../../services/command.service';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../ux/button/button.component';
import { CheckinTicketComponent } from '../../ux/checkin-ticket/checkin-ticket.component';
import Price, {
  ApiResponse,
  PriceWithCount,
} from '../../../models/PriceInterface';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  Exposition,
  ResponseApiExposition,
} from '../../../models/ExpositionInterface';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  public expositions: Exposition[] | undefined;
  public selectedExposition!: Exposition | null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,

    private readonly commandService: CommandService,
  ) {
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
    this.getExpositions();
  }
  getPrices(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  getExpositions() {
    return this.http.get('/api/expositions').subscribe({
      next: (response) => {
        if (!this.isGetExpostionValid(response))
          throw new Error('Format Invalid');

        this.expositions = response.data.map((item) => {
          const newExposition: Exposition = {
            id: item.id,
            name: item.name,
            description: item.description,
            departure_date: new Date(item.departure_date),
            end_date: new Date(item.end_date),
          };
          return newExposition;
        });
      },
    });
  }
  isGetExpostionValid(dataApi: unknown): dataApi is ResponseApiExposition {
    if (dataApi && typeof dataApi == 'object' && 'data' in dataApi) {
      return true;
    } else return false;
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

  handleCommandSubmit() {
    if (
      this.selectedExposition &&
      this.listPrice.some((price) => price.count > 0)
    ) {
      const choiceTickets = this.listPrice
        .filter((price) => price.count > 0)
        .map((price) => ({
          price: price.id,
          quantity: price.count,
          exposition: this.selectedExposition!.id,
        }));

      this.commandService
        .sendCommandToApi(choiceTickets, this.selectedExposition)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['validation-commande']);
          },
          error: (err) => {
            console.error("Erreur lors de l'envoi de la commande", err);
          },
        });
    } else {
      console.error('Veuillez sélectionner une exposition et des billets.');
    }
  }
}
