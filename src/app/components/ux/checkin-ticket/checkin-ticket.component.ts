import { Component, input, output } from '@angular/core';
import Price from '../../../models/PriceInterface';

@Component({
  selector: 'app-checkin-ticket',
  imports: [],
  templateUrl: './checkin-ticket.component.html',
  styleUrl: './checkin-ticket.component.css',
})
export class CheckinTicketComponent {
  count = 0;
  onValueChanged = output<{ id: number; count: number }>();

  ticketType = input<Price>({
    id: 0,
    tickets_type: 'Adulte',
    price: 20,
  });

  increment() {
    this.count += 1;
    this.onValueChanged.emit({ id: this.ticketType().id, count: this.count });
  }
  decrement() {
    if (this.count > 0) this.count -= 1;
  }
}
