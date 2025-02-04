import { Component } from '@angular/core';
import { ButtonComponent } from '../../ux/button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-connexion',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css',
  standalone: true,
})
export class ConnexionComponent {
  connexionForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
  ) {
    this.connexionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.connexionForm.valid) {
      // Logique de connexion avec this.connexionForm.get('email')?.value;
      console.log('formulaire valide');
      const email: string = this.connexionForm.get('email')?.value;
      const password: string = this.connexionForm.get('password')?.value;

      const observableResponseApi = this.auth.login(email, password);
      // TODO: implémenter la logique de connexion
      observableResponseApi.subscribe({
        next: (responseApi) => console.log(`Réponse API : ${responseApi}`), //TODO: à modifié
        error: (error) => console.error(`Erreur login: ${error}`), //TODO: à modifié;
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
