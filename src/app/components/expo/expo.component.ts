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
  dataExpoCard = input<Exposition>();
  imageUrl = input<string>('imageUrl is required');
  layout = input<string>('top');
}
