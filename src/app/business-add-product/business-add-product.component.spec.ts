import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAddProductComponent } from './business-add-product.component';

describe('BusinessAddProductComponent', () => {
  let component: BusinessAddProductComponent;
  let fixture: ComponentFixture<BusinessAddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
