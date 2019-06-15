import { Order } from './customer-order-component/order';
import { OnInit, Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { OrderServiceService } from './customer-order-component/order-service.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.scss']
})
export class CustomerOrderComponent implements OnInit {

  formDate: FormGroup = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
  });

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(private orderService: OrderServiceService,private auth: AuthService) { }
  orders: Order[];

  copyOrders: Order[];

  ordersFilter: Order[] = [];

  ngOnInit() {
    this.fillOrders();

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
  public async fillOrders(){
    console.log(this.auth.userData.type)
    if(this.auth.userData.type == "customer"){
      this.orders = await this.orderService.getOrder("customerID");

    }
    else if(this.auth.userData.type == "business"){
      this.orders = await this.orderService.getOrder("businessID");
    }
    this.copyOrders = this.orders;
  }

}
