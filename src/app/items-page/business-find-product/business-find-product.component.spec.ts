import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessFindProductComponent } from './business-find-product.component';

describe('BusinessFindProductComponent', () => {
  let component: BusinessFindProductComponent;
  let fixture: ComponentFixture<BusinessFindProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessFindProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessFindProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
