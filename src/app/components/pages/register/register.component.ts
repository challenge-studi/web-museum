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
  utilisateurs: any[] = [];

  constructor(private readonly fb: FormBuilder) {
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
      const lastname = this.inscriptionForm.get('lastname')?.value;
      const firstname = this.inscriptionForm.get('firstname')?.value;
      const email = this.inscriptionForm.get('email')?.value;
      const password = this.inscriptionForm.get('password')?.value;
      const confirmPassword =
        this.inscriptionForm.get('confirmPassword')?.value;
      const birthday = this.inscriptionForm.get('birthday')?.value;
      this.utilisateurs.push({
        lastname,
        firstname,
        email,
        password,
        confirmPassword,
        birthday,
      });
      this.inscriptionForm.reset();
    }
  }
}
