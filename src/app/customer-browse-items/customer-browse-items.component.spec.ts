import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBrowseItemsComponent } from './customer-browse-items.component';

describe('CustomerBrowseItemsComponent', () => {
  let component: CustomerBrowseItemsComponent;
  let fixture: ComponentFixture<CustomerBrowseItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerBrowseItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBrowseItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
