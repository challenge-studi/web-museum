import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { HeaderComponent } from './components/layout/header/header.component';
import { SearchbarComponent } from './components/layout/searchbar/searchbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SearchbarComponent,
    FooterComponent,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'web-museum';

  constructor(private readonly auth: AuthService) {}

  ngOnInit() {
    this.auth.loadToken();
  }
}
