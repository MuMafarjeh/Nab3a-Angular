import { Order } from './business-order-component/order';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderServiceService } from './business-order-component/order-service.service';

@Component({
  selector: 'app-business-order',
  templateUrl: './business-order.component.html',
  styleUrls: ['./business-order.component.scss']
})
export class BusinessOrderComponent implements OnInit {

    date = new FormControl(new Date());
    serializedDate = new FormControl((new Date()).toISOString());

  constructor(private orderService: OrderServiceService) { }
 orders :Order[];
  ngOnInit() {
    this.orders = this.orderService.getOrder();
  }

}
