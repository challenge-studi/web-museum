import { TerminalPaiementComponent } from './components/pages/feature/terminal-paiement/terminal-paiement.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { PresentationComponent } from './components/pages/presentation/presentation.component';
import { BilletterieComponent } from './components/pages/billetterie/billetterie.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'presentation', component: PresentationComponent },
  {
    path: 'billetterie',
    component: BilletterieComponent,
    canActivate: [authGuard],
  },
  { path: 'auth', component: AuthComponent },
  { path: 'validation-commande', component: TerminalPaiementComponent },
];
