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

  it('should add 1 to the counter', () => {
    component.increment();
    expect(component.count).toBe(1);
  });

  it('should remove 1 from the counter', () => {
    component.count = 5;
    component.decrement();
    expect(component.count).toBe(4);
  });

  it('should not be less than 0', () => {
    component.count = 0;
    component.decrement();
    expect(component.count).toBe(0);
  });
});
