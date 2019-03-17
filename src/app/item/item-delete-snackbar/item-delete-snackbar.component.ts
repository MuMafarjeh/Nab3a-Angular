import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Item } from '../item';

@Component({
  selector: 'app-item-delete-snackbar',
  templateUrl: './item-delete-snackbar.component.html',
  styleUrls: ['./item-delete-snackbar.component.scss']
})
export class ItemDeleteSnackbarComponent implements OnInit {

  item: Item;

  constructor(private bottomSheetRef: MatBottomSheetRef<ItemDeleteSnackbarComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  ngOnInit() {
    this.item = this.data;
  }

  public onClick(isDelete: boolean)
  {
    this.bottomSheetRef.dismiss({
      message: isDelete,
    });
    event.preventDefault();
  }

}
