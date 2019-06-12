import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from '../business-order/business-order-component/order-service.service';
import { Order } from '../business-order/business-order-component/order';
import { FollowingService } from '../services/following.service';
import { following } from '../following-customer-page/following';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page-customer',
  templateUrl: './home-page-customer.component.html',
  styleUrls: ['./home-page-customer.component.scss']
})
export class HomePageCustomerComponent implements OnInit {
  imagesUrl;
  imagesItemUrl;

  order:following[];

  constructor(private OrderService: OrderServiceService,
    private router: Router,private FollowingService:FollowingService) { 
   
   }

  ngOnInit() {
    this.imagesUrl = [
      'assets/logo.png',
      'assets/thermal.jpg',
      'assets/3-d.jpg',
      ];
      this.getImageItem();
      
  }
  public getImageItem(){
    this.order = this.FollowingService.getfollowingCoustmer("customerID");
    console.log(this.FollowingService.getfollowingCoustmer("customerID").length);
  }

}
