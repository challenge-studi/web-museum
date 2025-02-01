import { Component } from '@angular/core';
import { ButtonComponent } from '../../ux/button/button.component';
import { CheckinTicketComponent } from '../../ux/checkin-ticket/checkin-ticket.component';
import Price from '../../../models/PriceInterface';

@Component({
  selector: 'app-billetterie',
  imports: [ButtonComponent, CheckinTicketComponent],
  templateUrl: './billetterie.component.html',
  styleUrl: './billetterie.component.css',
})
export class BilletterieComponent {
  public listPrice: Price[] = [];

  constructor() {
    // just pour le test
    this.listPrice.push(
      {
        id: 0,
        tickets_type: 'Adulte',
        price: 20,
      },
      {
        id: 1,
        tickets_type: 'Enfant - de 16 ans',
        price: 15,
      },
      {
        id: 2,
        tickets_type: 'Enfant - de 6 ans',
        price: 0,
      },
    );
  }
}
