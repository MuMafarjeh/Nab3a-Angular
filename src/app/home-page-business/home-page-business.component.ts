import { Component, OnInit } from '@angular/core';
import { FollowingService } from '../services/following.service';
import { ItemsService } from '../item/items.service';
import { following } from '../following-customer-page/following';
import { Item } from '../item/item';
import { OrderServiceService } from '../business-order/business-order-component/order-service.service';
import { Order } from '../business-order/business-order-component/order';

@Component({
  selector: 'app-home-page-business',
  templateUrl: './home-page-business.component.html',
  styleUrls: ['./home-page-business.component.scss']
})
export class HomePageBusinessComponent implements OnInit {

  follow: following[];
  item: Item[];
  orders: Order[];
  data: any;

  date: any;
  lableX = [];
  lableY = [];

  constructor(private followingService: FollowingService, private itemsService: ItemsService, private OrderService: OrderServiceService) {
    this.follow = followingService.getfollowingCoustmer("businessID");
    itemsService.getInventory().then(res => {
      this.item = res;
    });
    /*
        this.orders = OrderService.getOrders();
        console.log(this.orders.length);
        */
   
  }


  ngOnInit() {
    this.getDaysInMonth();

    this.getData();

    this.data = {
      labels: this.lableX,
      datasets: [
        {
          label: 'orders In Day',
          data: this.lableY,
          fill: true,
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
        },

      ]
    }
  }
  public getDaysInMonth() {
    this.date = new Date();
    var month = this.date.getMonth() + 1;

    var day;
    if (month == 1) {
      day = 31;
    }
    else if (month == 2) {
      day = 28;
    }
    else if (month == 3) {
      day = 31;
    }
    else if (month == 4) {
      day = 30;
    }
    else if (month == 5) {
      day = 31;
    }
    else if (month == 6) {
      day = 30;
    }
    else if (month == 7) {
      day = 31;
    }
    else if (month == 8) {
      day = 31;
    }
    else if (month == 9) {
      day = 30;
    }
    else if (month == 10) {
      day = 31;
    }
    else if (month == 11) {
      day = 30;
    }
    else if (month == 12) {
      day = 31;
    }
    for (let index = 1; index <= day; index++) {
      this.lableX[index - 1] = index;
      this.lableY[index - 1] = 0;
    }

  }
  public async getData() {
    this.orders = await this.OrderService.getOrder("businessID");
    for (let index = 0; index < this.orders.length; index++) {
      var indexIn = this.orders[index].TGDate.getDay() + 8;
      this.lableY[indexIn]++;
      console.log(this.orders[index].TGDate.getDay());
    }
    
  }

}
