import { CommandService } from './../services/command.service';
import { Component } from '@angular/core';
import { ButtonComponent } from './ux/button/button.component';
import { CommonModule } from '@angular/common';

import { DetailCommand } from '../models/CommandInterface';

@Component({
  selector: 'app-terminal-paiement',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './terminal-paiement.component.html',
  styleUrl: './terminal-paiement.component.css',
})
export class TerminalPaiementComponent {
  detailCommand: DetailCommand[] = [];

  constructor(private readonly commandService: CommandService) {
    this.detailCommand = commandService.getDetailCommand();
  }
  calculateTotal(): number {
    return this.commandService.detailCommand.reduce(
      (total, ticket) => total + ticket.price * ticket.count,
      0,
    );
  }
}
