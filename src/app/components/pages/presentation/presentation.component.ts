import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExpoComponent } from '../../expo/expo.component';
import { Exposition } from '../../../models/ExpositionInterface';

@Component({
  selector: 'app-presentation',
  imports: [ExpoComponent, CommonModule],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.css',
})
export class PresentationComponent {
  expositions: Exposition[] = [
    {
      id: 1,
      name: "Trésors de l'Égypte Ancienne",
      description:
        "Découvrez les mystères et les merveilles de l'Égypte ancienne à travers des artefacts rares et des récits fascinants.",
      departure_date: new Date('2023-10-01'),
      end_date: new Date('2023-10-10'),
    },
    {
      id: 2,
      name: 'Maîtres de la Peinture Moderne',
      description:
        "Explorez les œuvres des plus grands maîtres de la peinture moderne, de Picasso à Pollock, et plongez dans l'art au XXe siècle.",
      departure_date: new Date('2023-11-01'),
      end_date: new Date('2023-11-10'),
    },
    {
      id: 3,
      name: 'Sculptures Contemporaines',
      description:
        'Admirez les œuvres innovantes et expressives des sculpteurs contemporains, qui repoussent les limites de la forme et de la matière.',
      departure_date: new Date('2023-12-01'),
      end_date: new Date('2023-12-10'),
    },
    {
      id: 4,
      name: 'Art Numérique et Réalité Virtuelle',
      description:
        "Explorez les frontières de l'art numérique, où les artistes utilisent la technologie pour créer des expériences immersives et innovantes.",
      departure_date: new Date('2024-01-01'),
      end_date: new Date('2024-01-10'),
    },
  ];

  imageUrls: string[] = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
  ];
}
