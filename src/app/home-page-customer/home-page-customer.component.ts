import { Component, OnInit } from '@angular/core';
import { FollowingService } from '../services/following.service';
import { ItemsService } from '../item/items.service';
import { following } from '../following-customer-page/following';
import { Item } from '../item/item';
import { OrderServiceService } from '../business-order/business-order-component/order-service.service';
import { Order } from '../business-order/business-order-component/order';

@Component({
  selector: 'home-page-customer',
  templateUrl: './home-page-customer.component.html',
  styleUrls: ['./home-page-customer.component.scss']
})
export class HomePageCustomerComponent implements OnInit {


  follow: following[];
  item: Item[];
  orders: Order[];

  randomItem: Item[] = [];
  forRandomItem = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];
  constructor(private OrderService: OrderServiceService,
    private FollowingService: FollowingService, private itemService: ItemsService) {
    this.follow = FollowingService.getfollowingCoustmer("customerId");

    itemService.getRandomInventory().then(res => {
      this.item = res;
    });

  }


  ngOnInit() {
    this.getData();


  }


  public async getData() {
    this.orders = await this.OrderService.getOrder("customerID");

    // for (let index = 0; index < 10; ) {
    //   let random = Math.floor((Math.random() * 10) + 1);
    //   if (this.forRandomItem[random] == 1) {
    //     this.randomItem[index] = this.item[random];
    //     this.forRandomItem[random] = 0;
    //     index++

    //    }

    // }

  }




}
