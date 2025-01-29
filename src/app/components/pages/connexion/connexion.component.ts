import { Component } from '@angular/core';
import { ButtonComponent } from '../../ux/button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-connexion',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css',
})
export class ConnexionComponent {
  connexionForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.connexionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.connexionForm.valid) {
      // Logique de connexion avec this.connexionForm.get('email')?.value;
    }
  }
}
