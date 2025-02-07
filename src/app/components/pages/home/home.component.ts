import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../ux/button/button.component';
import User from '../../../models/UserInterface';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public user: User | undefined;

  constructor(private readonly auth: AuthService) {}

  ngOnInit(): void {
    // Récupérer l'utilisateur directement
    this.user = this.auth.getUser();
    console.log(this.user);
  }
}
