import { Item } from './../../item/item';
import { Order } from './order';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { OrderServiceService } from './order-service.service';
import { Input, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-business-order-component',
  templateUrl: './business-order-component.component.html',
  styleUrls: ['./business-order-component.component.scss']
})
export class BusinessOrderComponentComponent implements OnInit {

  constructor(public dialog: MatDialog,private orderService: OrderServiceService,private snackBar: MatSnackBar) { }

  @Input()
 order:Order;
item:Item[];

// product:Item;
notPrepared=true;



  ngOnInit() {

  }
  _width: 1000;
  openDialog(): void {
    this.item = this.orderService.getProducts(this.order);
    const dialogRef = this.dialog.open(MyDialogComponent, {
     data:  this.item ,

   get width() {
        return this._width;
      },

   //  data:{}
    //  data: {currency: this.currency, finalPrice: this.finalPrice, name:this.name,quantity:this.quantity }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');

    });
  }
  confirm(){


    if(this.order.status=="prepared"){

      this.snackBar.open("nottttttttttttt" ,"!!!!!",{
        duration: 2000,
      });
    }else{
      this.orderService.confirmOrder(this.order);

       this.snackBar.open("The order is confirmed!" ,"!!!!!",{
         duration: 2000,
       });

    }


    //alert("the order is confirmed!");


}

}
