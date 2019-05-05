import { AuthService } from './../auth/auth.service';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ItemCart } from '../item/item.cart';
import { UserBusiness } from '../user/userbusiness';

@Component({
  selector: 'app-customer-cart-page',
  templateUrl: './customer-cart-page.component.html',
  styleUrls: ['./customer-cart-page.component.scss']
})
export class CustomerCartPageComponent implements OnInit {

  constructor(private cartService: CartService, private authService: AuthService) { }

  carts: ItemCart[][];
  businessData: UserBusiness[];

  async ngOnInit() {
    await this.cartService.getCartsForUser(this.authService.userID);
    this.carts = this.cartService.carts;
    // this.businessData = this.cartService.businessData;
    // this.businessData = this.cartService.businessData;
  }

  public cartsAvailable(): boolean
  {
    return this.carts && this.carts.length > 0;
  }

}
