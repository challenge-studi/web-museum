import { Component } from '@angular/core';

@Component({
  selector: 'app-billet',
  imports: [],
  templateUrl: './billet.component.html',
  styleUrl: './billet.component.css',
})
export class BilletComponent {
  commandService(commandService: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
}
