import { Component } from '@angular/core';
import { SchedulesComponent } from '../../schedules/schedules.component';

@Component({
  selector: 'app-footer',
  imports: [SchedulesComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
