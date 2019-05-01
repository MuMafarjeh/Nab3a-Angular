import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBusinessSuggestionComponent } from './item-business-suggestion.component';

describe('ItemCustomerComponent', () => {
  let component: ItemBusinessSuggestionComponent;
  let fixture: ComponentFixture<ItemBusinessSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemBusinessSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBusinessSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
