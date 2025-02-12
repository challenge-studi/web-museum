import { CommandService } from './../../../services/command.service';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../ux/button/button.component';
import { CheckinTicketComponent } from '../../ux/checkin-ticket/checkin-ticket.component';
import Price, {
  PriceApi,
  PriceWithCount,
} from '../../../models/PriceInterface';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  Exposition,
  ExpositionApi,
  ResponseApiExposition,
} from '../../../models/ExpositionInterface';

import { CommonModule } from '@angular/common';
import { Data, Router } from '@angular/router';
import { ResponseApi } from '../../../models/ResponseApi';
import { DetailCommand } from '../../../models/CommandInterface';

@Component({
  selector: 'app-billetterie',
  imports: [ButtonComponent, CheckinTicketComponent, CommonModule],
  templateUrl: './billetterie.component.html',
  styleUrl: './billetterie.component.css',
})
export class BilletterieComponent {
  public listPrice: PriceWithCount[] = [];
  public totalPrice: number = 0;
  public expositions: Exposition[] | undefined;
  public selectedExposition: Exposition | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,

    private readonly commandService: CommandService,
  ) {
    this.getPrices();
    this.getExpositions();
  }

  getPrices() {
    this.http.get('/api/prices').subscribe((response) => {
      console.log('Response from API:', response);

      // vérifie la data
      if (!this.isGetResponseApiValid<PriceApi[]>(response))
        throw new Error('Type invalid');

      const prices = response.data;

      if (Array.isArray(prices)) {
        this.listPrice = prices.map((price: Price) => ({ ...price, count: 0 }));
        console.log('Mapped prices:', this.listPrice);
      } else {
        console.error('Expected an array of prices but got:', prices);
      }
    });
  }

  getExpositions() {
    return this.http.get('/api/expositions').subscribe({
      next: (response) => {
        if (!this.isGetResponseApiValid<ExpositionApi[]>(response))
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

  isGetResponseApiValid<T>(dataApi: unknown): dataApi is ResponseApi<T> {
    if (dataApi && typeof dataApi === 'object' && 'data' in dataApi) {
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
      const detailCommand: DetailCommand[] = this.listPrice
        .filter((price) => price.count > 0)
        .map((item) => {
          if (!this.selectedExposition)
            throw new Error("L'exposition doit etre sélectionnée");
          const theDetail: DetailCommand = {
            ...item,
            expo: this.selectedExposition,
          };
          return theDetail;
        });

      // en envoie au service
      this.commandService.setDetailCommand(detailCommand);

      const choiceTickets = detailCommand.map((price) => ({
        price: price.id,
        quantity: price.count,
        exposition: this.selectedExposition!.id,
      }));

      this.commandService.sendCommandToApi(choiceTickets).subscribe({
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
