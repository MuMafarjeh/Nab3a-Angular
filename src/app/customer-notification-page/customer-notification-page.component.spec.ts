import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNotificationPageComponent } from './customer-notification-page.component';

describe('CustomerNotificationPageComponent', () => {
  let component: CustomerNotificationPageComponent;
  let fixture: ComponentFixture<CustomerNotificationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerNotificationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNotificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
