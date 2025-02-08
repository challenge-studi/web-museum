import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../ux/button/button.component';

import { getCurrentMonthDates } from '../../../helpers/formatDate';
import User from '../../../models/UserInterface';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private readonly auth: AuthService,
    private readonly http: HttpClient,
  ) {
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
