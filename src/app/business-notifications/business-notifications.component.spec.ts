import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessNotificationsComponent } from './business-notifications.component';

describe('BusinessNotificationsComponent', () => {
  let component: BusinessNotificationsComponent;
  let fixture: ComponentFixture<BusinessNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
