import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ItemCart } from '../item/item.cart';

@Component({
  selector: 'app-customer-cart-page',
  templateUrl: './customer-cart-page.component.html',
  styleUrls: ['./customer-cart-page.component.scss']
})
export class CustomerCartPageComponent implements OnInit {

  constructor(private cartService: CartService) { }

  carts: ItemCart[][];

  ngOnInit() {
    this.carts = this.cartService.carts;
  }

  public cartsAvailable(): boolean
  {
    return this.carts && this.carts.length > 0;
  }

}
