import { CommonModule } from '@angular/common';
import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../ux/button/button.component';
import User from '../../../models/UserInterface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  user: User | undefined; // Utilisation de l'interface User
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private readonly AuthService: AuthService) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.user = this.AuthService.getUser();
  }

  onChangePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Vous avez saisi 2 mots de passe differents.';
      return;
    }
    this.AuthService.changePassword(
      this.currentPassword,
      this.newPassword,
      this.confirmPassword,
    ).subscribe({
      next: (updateUser) => {
        this.message = 'Votre mot de passe a bien été changé !';
        this.loadUserData();
      },
      error: (err) => {
        this.message = 'Une erreur est survenue.';
        console.error(err);
      },
    });
  }
}
