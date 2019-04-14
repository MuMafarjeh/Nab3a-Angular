import { Order } from './business-order-component/order';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { OrderServiceService } from './business-order-component/order-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-business-order',
  templateUrl: './business-order.component.html',
  styleUrls: ['./business-order.component.scss']
})
export class BusinessOrderComponent implements OnInit {

  formDate: FormGroup = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
  });

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(private orderService: OrderServiceService) { }
  orders: Order[];

  copyOrders: Order[];

  ordersFilter: Order[] = [];

  ngOnInit() {
    this.orders = this.orderService.getOrder();
    this.copyOrders = this.orders;
  }
  filter() { 
    this.ordersFilter = [];
    this.copyOrders.forEach(element => {
      var fromDate = element.TGDate;
      var toDate = element.TRDate;
      if ((fromDate.getTime() >= this.formDate.controls['fromDate'].value.getTime()) && (fromDate.getTime() <= this.formDate.controls['toDate'].value.getTime())) {
        this.ordersFilter.push(element);
      }
    });

    this.orders = this.ordersFilter;
  }

}
