import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  connected$;

  constructor(public readonly auth: AuthService) {
    this.connected$ = this.auth.connected$;
  }
}
