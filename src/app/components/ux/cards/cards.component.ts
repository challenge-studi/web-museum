import { Component, input } from '@angular/core';
import OeuvreInterface from '../../../models/OeuvreInterface';

@Component({
  selector: 'app-cards',
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  dataCard = input<OeuvreInterface>({ object: 'Papyrus', epoque: 'Egytien' });
  isEven = input<boolean>(true);
}
