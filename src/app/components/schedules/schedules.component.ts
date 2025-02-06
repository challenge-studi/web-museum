import { Component } from '@angular/core';
import Horaire from '../../models/HorairesInterface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schedules',
  imports: [],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css',
})
export class SchedulesComponent {
  horaires: Horaire[] = [];
  private readonly apiUrl = '/api/horaires';

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ data: any[] }>(this.apiUrl).subscribe({
      next: (response) => {
        this.horaires = response.data.map((item) => ({
          id: item.id,
          day_of_week: item.day_of_week,
          opening_time: this.formatTime(item.opening_time),
          closing_time: this.formatTime(item.closing_time),
        }));
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des horaires', err);
      },
    });
  }

  // Méthode pour formater l'heure
  formatTime(time: string): string {
    if (time) {
      const [hours, minutes] = time.split(':');
      return `${hours}:${minutes}`;
    }
    return '';
  }
}
