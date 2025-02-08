import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExpoComponent } from '../../expo/expo.component';
import { Exposition } from '../../../models/ExpositionInterface';
import expoData from '../../../mock/exposition.json';

@Component({
  selector: 'app-presentation',
  imports: [ExpoComponent, CommonModule],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.css',
})
export class PresentationComponent {
  expositions: Exposition[] = expoData.map((expo) => ({
    ...expo,
    departure_date: new Date(expo.departure_date),
    end_date: new Date(expo.end_date),
  }));

  imageUrls: string[] = [
    'images/egypte.jpg',
    'images/picasso.jpg',
    'images/sculpture.jpg',
    'images/artnumerique.jpg',
  ];
}
