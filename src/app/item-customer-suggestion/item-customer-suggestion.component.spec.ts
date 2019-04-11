import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCustomerSuggestionComponent } from './item-customer-suggestion.component';

describe('ItemCustomerComponent', () => {
  let component: ItemCustomerSuggestionComponent;
  let fixture: ComponentFixture<ItemCustomerSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCustomerSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCustomerSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
