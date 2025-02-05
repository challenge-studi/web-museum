import { Component } from '@angular/core';
import { ButtonComponent } from '../../ux/button/button.component';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  user = {
    nom: 'Einstein',
    prenom: 'albert',
    email: 'albert@einstein.fr',
    motDePasse: 'albert',
    birthday: '01/01/1910',
  };
}
