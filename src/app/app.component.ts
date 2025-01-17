import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchbarComponent } from './components/layout/searchbar/searchbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'web-museum';
}
