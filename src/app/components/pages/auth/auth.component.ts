import { Component } from '@angular/core';
import { ConnexionComponent } from '../connexion/connexion.component';
import { RegisterComponent } from '../register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [ConnexionComponent, RegisterComponent, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {}
