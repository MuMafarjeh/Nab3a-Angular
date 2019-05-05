import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCustomerCartComponent } from './item-customer-cart.component';

describe('ItemCustomerCartComponent', () => {
  let component: ItemCustomerCartComponent;
  let fixture: ComponentFixture<ItemCustomerCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCustomerCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCustomerCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
