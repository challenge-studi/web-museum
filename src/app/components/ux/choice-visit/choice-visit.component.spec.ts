import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceVisitComponent } from './choice-visit.component';

describe('ChoiceVisitComponent', () => {
  let component: ChoiceVisitComponent;
  let fixture: ComponentFixture<ChoiceVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceVisitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChoiceVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
