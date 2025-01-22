import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { PresentationComponent } from './components/pages/presentation/presentation.component';
import { BilletterieComponent } from './components/pages/billetterie/billetterie.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'presentation', component: PresentationComponent },
  { path: 'billetterie', component: BilletterieComponent },
];
