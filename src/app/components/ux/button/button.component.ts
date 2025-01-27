import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  name = input('Click');
  variant = input<'primary' | 'secondary'>('primary');
  buttonCliked = output<void>();

  onClick() {
    console.log('Boom');
    this.buttonCliked.emit();
  }
}
