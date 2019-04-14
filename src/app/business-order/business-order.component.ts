import { Order } from './business-order-component/order';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderServiceService } from './business-order-component/order-service.service';
import { Item } from '../item/item';

@Component({
  selector: 'app-business-order',
  templateUrl: './business-order.component.html',
  styleUrls: ['./business-order.component.scss']
})
export class BusinessOrderComponent implements OnInit {

    date = new FormControl(new Date());
    serializedDate = new FormControl((new Date()).toDateString());

    endperiod = new FormControl(new Date());
    serializedDate1 = new FormControl((new Date()).toISOString());

  constructor(private orderService: OrderServiceService) { }
 orders :Order[];
//  item:Item[];
  ngOnInit() {
    this.orders = this.orderService.getOrder();
   // this.orders = this.orderService.getOrderbyDAte(date,endperiod);
    // this.item = this.orderService.getProducts(Order.id);

   // this.serializordersedDate;

  }
  // public onDate(event): void {
  //   this.roomsFilter.date = event;
  //   this.getData(this.roomsFilter.date);
  // }
}
