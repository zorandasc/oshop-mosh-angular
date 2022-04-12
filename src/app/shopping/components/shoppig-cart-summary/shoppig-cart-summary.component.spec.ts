import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppigCartSummaryComponent } from './shoppig-cart-summary.component';

describe('ShoppigCartSummaryComponent', () => {
  let component: ShoppigCartSummaryComponent;
  let fixture: ComponentFixture<ShoppigCartSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppigCartSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppigCartSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
