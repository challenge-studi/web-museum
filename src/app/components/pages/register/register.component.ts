import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../ux/button/button.component';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import User from '../../../models/UserInterface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ButtonComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  inscriptionForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
  ) {
    this.inscriptionForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.inscriptionForm.valid) {
      const user: User = {
        lastname: this.inscriptionForm.get('lastname')?.value,
        firstname: this.inscriptionForm.get('firstname')?.value,
        email: this.inscriptionForm.get('email')?.value,
        birthday: this.inscriptionForm.get('birthday')?.value,
      };

      const password = this.inscriptionForm.get("password")?.value;

      console.log('User data to be sent:', user);

      this.authService.register(user, password).subscribe({
        next: (response) => {
          console.log('Inscription réussie:', response);
          this.inscriptionForm.reset();
        },
        error: (error) => {
          console.error("Erreur lors de l'inscription:", error);
        },
      });
    }
  }
}
