import { Component } from '@angular/core';
import { ButtonComponent } from '../../ux/button/button.component';
import { CardsComponent } from '../../ux/cards/cards.component';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, CardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
