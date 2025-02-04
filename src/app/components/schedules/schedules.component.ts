import { Component } from '@angular/core';
import Horaire from '../../models/HorairesInterface';

@Component({
  selector: 'app-schedules',
  imports: [],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css',
})
export class SchedulesComponent {
  horaires: Horaire[] = [
    {
      id: 1,
      day_of_week: 'Mardi',
      opening_time: '09:00',
      closing_time: '17:00',
    },
    {
      id: 2,
      day_of_week: 'Mercredi',
      opening_time: '09:00',
      closing_time: '17:00',
    },
    {
      id: 3,
      day_of_week: 'Jeudi',
      opening_time: '09:00',
      closing_time: '17:00',
    },
    {
      id: 4,
      day_of_week: 'Vendredi',
      opening_time: '09:00',
      closing_time: '17:00',
    },
    {
      id: 5,
      day_of_week: 'Samedi',
      opening_time: '08:00',
      closing_time: '18:00',
    },
    {
      id: 6,
      day_of_week: 'Dimanche',
      opening_time: '09:00',
      closing_time: '12:00',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
