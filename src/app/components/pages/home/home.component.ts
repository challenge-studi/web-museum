import { Component } from '@angular/core';
import { ButtonComponent } from '../../ux/button/button.component';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
