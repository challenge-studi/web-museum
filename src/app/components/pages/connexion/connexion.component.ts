import { Component } from '@angular/core';
import { ButtonComponent } from '../../ux/button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-connexion',
  imports: [ReactiveFormsModule, ButtonComponent, AsyncPipe],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css',
  standalone: true,
})
export class ConnexionComponent {
  connexionForm: FormGroup;
  public connected$;

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
  ) {
    this.connexionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.connected$ = this.auth.connected$;
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
        complete: () => console.log('Data de API reçu completement'),
      });
    } else {
      console.log('Formulaire invalide');
    }
  }

  onLogout() {
    console.log('Logout');
    this.auth.logout();
  }

  onTest() {
    console.log('test');
    // abonnement à l'observable test :
    this.auth.connected$.subscribe({
      next: (value) =>
        console.log(`L'utilisateur est ${value ? 'connecté' : 'Déconnecté'}`),
      error: (error) => console.log('Erreur fatal' + JSON.stringify(error)),
      complete: () => console.log('Fin de la diffusion'),
    });
  }
}
