import { Component, input } from '@angular/core';
import { Exposition } from '../../models/ExpositionInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expo',
  imports: [CommonModule],
  templateUrl: './expo.component.html',
  styleUrl: './expo.component.css',
})
export class ExpoComponent {
  dataCard = input<Exposition>();
  imageUrl = input<string>();
  layout = input<string>();
}
