import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinTicketComponent } from './checkin-ticket.component';

describe('CheckinTicketComponent', () => {
  let component: CheckinTicketComponent;
  let fixture: ComponentFixture<CheckinTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckinTicketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckinTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
