import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../item/item';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from '../item/items.service';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { CartService } from '../services/cart.service';
import { UserBusiness } from '../user/userbusiness';
import { Subject } from 'rxjs';
import { ItemCart } from 'functions/src/item.cart';

@Component({
  selector: 'app-item-customer-cart',
  templateUrl: './item-customer-cart.component.html',
  styleUrls: ['./item-customer-cart.component.scss']
})
export class ItemCustomerCartComponent implements OnInit {

  @Input()
  item: ItemCart;
  itemID: string;

  @Input()
  inCart: boolean = false;

  @Input()
  public cartNum: number = 0;
  @Input()
  public itemNum: number = 0;

  @Input()
  public disabled: boolean = false;

  @Output()
  public removeFromCart = new EventEmitter<any>();

  @Output()
  public confirmQuantity = new EventEmitter<ItemCart>();

  quantityForm: FormGroup;
  quantity: number;

  originalQuantity: number;

  businessData: UserBusiness;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, 
    private userService: UserService, private formBuilder: FormBuilder) 
  { 
    iconRegistry.addSvgIcon(
      'remove-from-cart-icon',
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/remove_from_cart_icon.svg"));
  }

  ngOnInit()
  { 
    this.quantityForm = this.formBuilder.group({
      quantity: [`${this.item.quantity}`, [Validators.required, Validators.pattern('[1-9][0-9]{0,3}')]],
    });

    this.originalQuantity = this.item.quantity;
  }

  getFinalPrice(): number
  {
    if(this.quantityForm.valid)
      return this.quantityForm.get('quantity').value * this.item.price;
    else
      return 0;
  }

  async getBusinessInfo()
  {
    this.businessData = await this.userService.getUser2(this.item.businessID) as UserBusiness;
  }

  btnRemoveFromCart()
  {
    this.removeFromCart.emit({
      cartNum: this.cartNum, 
      itemNum: this.itemNum
    });
  }

  onConfirmQuantity()
  {
    this.item.quantity = this.quantityForm.get('quantity').value;
    this.confirmQuantity.emit(this.item);
  }

  getQuantityChanged(): boolean
  {
    return this.quantityForm.get('quantity').value != this.originalQuantity;
  }
}