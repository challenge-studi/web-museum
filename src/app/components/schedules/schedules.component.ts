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
    this.http.get<Horaire[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log(data);
        //parser les data
      },
    });
  }
}
