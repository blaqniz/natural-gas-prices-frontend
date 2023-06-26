import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasPriceComponent } from './gas-price.component';

describe('GasPriceComponent', () => {
  let component: GasPriceComponent;
  let fixture: ComponentFixture<GasPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
