import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDeleteSnackbarComponent } from './item-delete-snackbar.component';

describe('ItemDeleteSnackbarComponent', () => {
  let component: ItemDeleteSnackbarComponent;
  let fixture: ComponentFixture<ItemDeleteSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDeleteSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDeleteSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
