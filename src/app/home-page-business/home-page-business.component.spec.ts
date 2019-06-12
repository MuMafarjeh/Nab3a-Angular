import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageBusinessComponent } from './home-page-business.component';

describe('HomePageBusinessComponent', () => {
  let component: HomePageBusinessComponent;
  let fixture: ComponentFixture<HomePageBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
