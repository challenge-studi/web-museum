import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilletterieComponent } from './billetterie.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BilletterieComponent', () => {
  let component: BilletterieComponent;
  let fixture: ComponentFixture<BilletterieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilletterieComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(BilletterieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
