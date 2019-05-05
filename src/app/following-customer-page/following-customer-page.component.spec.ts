import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingCustomerPageComponent } from './following-customer-page.component';

describe('FollowingCustomerPageComponent', () => {
  let component: FollowingCustomerPageComponent;
  let fixture: ComponentFixture<FollowingCustomerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingCustomerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingCustomerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
