import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalPaiementComponent } from './terminal-paiement.component';

describe('TerminalPaiementComponent', () => {
  let component: TerminalPaiementComponent;
  let fixture: ComponentFixture<TerminalPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminalPaiementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminalPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
