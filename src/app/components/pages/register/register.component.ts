import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import User from '../../../models/UserInterface';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  inscriptionForm: FormGroup;
  utilisateurs: User[] = [];

  constructor(private readonly fb: FormBuilder) {
    this.inscriptionForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.inscriptionForm.valid) {
      const nom = this.inscriptionForm.get('nom')?.value;
      const prenom = this.inscriptionForm.get('prenom')?.value;
      const email = this.inscriptionForm.get('email')?.value;
      const motDePasse = this.inscriptionForm.get('motDePasse')?.value;
      const birthday = this.inscriptionForm.get('birthday')?.value;
      this.utilisateurs.push({ nom, prenom, email, motDePasse, birthday });
      this.inscriptionForm.reset();
    }
  }
}
