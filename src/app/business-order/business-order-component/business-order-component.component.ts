import { Item } from './../../item/item';
import { Order } from './order';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MyDialogComponent } from './my-dialog/my-dialog.component';





@Component({
  selector: 'app-business-order-component',
  templateUrl: './business-order-component.component.html',
  styleUrls: ['./business-order-component.component.scss']
})
export class BusinessOrderComponentComponent implements OnInit {
  currency :number;
  price:number;
  quantity:number;
  items:string;
  constructor(public dialog: MatDialog) { }

  @Input()
 order:Order;
// product:Item;
  ngOnInit() {
  }
  _width: 1000;
  openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {

get width() {
        return this._width;
      },


      data: {currency: this.currency, price: this.price, quantity:this.quantity,items:this.items }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
