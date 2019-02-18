import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShirtsPromoComponent } from './shirts-promo.component';

describe('ShirtsPromoComponent', () => {
  let component: ShirtsPromoComponent;
  let fixture: ComponentFixture<ShirtsPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShirtsPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShirtsPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
