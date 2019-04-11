import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCustomerPageComponent } from './item-customer-page.component';

describe('ItemCustomerPageComponent', () => {
  let component: ItemCustomerPageComponent;
  let fixture: ComponentFixture<ItemCustomerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCustomerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCustomerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
