import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../ux/button/button.component';
import User from '../../../models/UserInterface';
import { getCurrentMonthDates } from '../../../helpers/formatDate';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public user: User | undefined;
  public startDate: string;
  public endDate: string;

  constructor(private readonly auth: AuthService) {
    const { start, end } = getCurrentMonthDates();
    this.startDate = start;
    this.endDate = end;
  }

  ngOnInit(): void {
    // Récupérer l'utilisateur directement
    this.user = this.auth.getUser();
    console.log(this.user);
  }
}
