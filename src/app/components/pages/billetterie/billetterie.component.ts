import { Component } from '@angular/core';
import { ButtonComponent } from '../../ux/button/button.component';
import { CheckinTicketComponent } from '../../ux/checkin-ticket/checkin-ticket.component';
import Price from '../../../models/PriceInterface';

type PriceWithCount = Price & { count: number };

@Component({
  selector: 'app-billetterie',
  imports: [ButtonComponent, CheckinTicketComponent],
  templateUrl: './billetterie.component.html',
  styleUrl: './billetterie.component.css',
})
export class BilletterieComponent {
  public listPrice: PriceWithCount[] = [];
  public totalPrice: number = 0;

  constructor() {
    // just pour le test
    this.listPrice.push(
      {
        id: 0,
        tickets_type: 'Adulte',
        price: 20,
        count: 0,
      },
      {
        id: 1,
        tickets_type: 'Enfant - de 16 ans',
        price: 15,
        count: 0,
      },
      {
        id: 2,
        tickets_type: 'Enfant - de 6 ans',
        price: 0,
        count: 0,
      },
    );
  }

  updateListPrice(id: number, newCount: number) {
    this.listPrice = this.listPrice.map((item) => {
      if (item.id === id) {
        const newItem = { ...item, count: newCount };
        return newItem; // nouvelle valeurs
      } else {
        return item; // pas de modification
      }
    });
    console.log(this.listPrice);
  }
  calculTotalPrice() {
    return this.listPrice.reduce(
      (sum, itemCurrent) => sum + itemCurrent.price * itemCurrent.count,
      0,
    );
  }

  test() {
    console.log(this.calculTotalPrice());
  }
}
