import { AuthService } from './../auth/auth.service';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ItemCart } from '../item/item.cart';
import { UserBusiness } from '../user/userbusiness';
import { UserCustomer } from '../user/usercustomer';

@Component({
  selector: 'app-customer-cart-page',
  templateUrl: './customer-cart-page.component.html',
  styleUrls: ['./customer-cart-page.component.scss']
})
export class CustomerCartPageComponent implements OnInit {

  constructor(private cartService: CartService, private authService: AuthService) 
  {
  }

  carts: ItemCart[][];
  businessData: UserBusiness[];
  finalPrice: number[];
  confirmed: boolean[];

  ngOnInit() {
    this.getData();
  }

  getData()
  {
    this.carts = this.cartService.carts;
    this.businessData = this.cartService.businessData;
    this.finalPrice = this.cartService.finalPrice;
  }

  public cartsAvailable(): boolean
  { 
    return this.carts && this.carts[0] && this.carts[0].length > 0;
  }

  public async removeFromCart(numbers: any)
  {
    if(this.getConfirmed(numbers.cartNum))
      return;

    await this.cartService.removeItemFromCart(numbers.cartNum, numbers.itemNum);
    this.getData();
  }

  public async onOrder(cartNum: number)
  {
    if(this.getConfirmed(cartNum))
      return;

    await this.cartService.confirmOrder(cartNum, this.authService.userData as UserCustomer);
    this.confirmed = this.cartService.confirmed;
  }

  async confirmQuantity(item: ItemCart)
  {
    // if(this.getConfirmed())
    //   return;
      
    await this.cartService.updateQuantity(item);
    this.getData();
  }

  getConfirmed(i: number): boolean
  {
    return this.cartService.getConfirmed(i);
  }
  
}
