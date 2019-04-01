import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOrderComponentComponent } from './business-order-component.component';

describe('BusinessOrderComponentComponent', () => {
  let component: BusinessOrderComponentComponent;
  let fixture: ComponentFixture<BusinessOrderComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessOrderComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessOrderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
