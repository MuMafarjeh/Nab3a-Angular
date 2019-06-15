import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderComponentComponent } from './customer-order-component.component';

describe('BusinessOrderComponentComponent', () => {
  let component: CustomerOrderComponentComponent;
  let fixture: ComponentFixture<CustomerOrderComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
