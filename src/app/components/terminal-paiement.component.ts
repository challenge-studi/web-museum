import { CommandService } from './../services/command.service';
import { Component } from '@angular/core';
import { ButtonComponent } from './ux/button/button.component';
import { CommonModule } from '@angular/common';
import { Exposition } from '../models/ExpositionInterface';
import { QuantityPerPrice } from '../models/CommandInterface';

@Component({
  selector: 'app-terminal-paiement',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './terminal-paiement.component.html',
  styleUrl: './terminal-paiement.component.css',
})
export class TerminalPaiementComponent {
  current_command: QuantityPerPrice[] = [];
  selectedExposition: Exposition | null = null;

  constructor(private readonly commandService: CommandService) {
    this.current_command = this.commandService.current_command;
    this.selectedExposition = this.commandService.selectedExposition;
  }

  calculateTotal(): number {
    return this.commandService.current_command.reduce(
      (total, ticket) => total + ticket.price * ticket.quantity,
      0,
    );
  }

  onSubmit() {
    // Logique de soumission du formulaire de paiement
    console.log('Formulaire de paiement soumis');
  }
}
