import { HttpService } from './../http/http.service';
import { ItemCart } from './../item/item.cart';
import { Item } from 'src/app/item/item';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { Subject } from 'rxjs';
import { UserBusiness } from '../user/userbusiness';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public doneLoadingCart = new Subject<boolean>();

  constructor(private firestore: AngularFirestore, private httpsService: HttpService) 
  {
    this.doneLoadingCart.next(false);
  }

  private _carts: ItemCart[][] = [[]] as ItemCart[][];
  private _businessData: UserBusiness[] = [] as UserBusiness[];

  public async getCartsForUser(userID): Promise<void>
  {
    this.doneLoadingCart.next(false);

    const result = await this.httpsService.getCartsForUser(userID);

    this._carts = result.carts;
    this._businessData = result.businessData;

    console.log("carts", this._carts)
    console.log("businessData", this._businessData)

    this.doneLoadingCart.next(true);
  }

  async addInventoryItemToCart(item: Item, quantity: number, userID: string)
  {
    await this.firestore.collection('cart').add({
      customerID: userID,
      quantity: quantity,
      timeCreated: UtilityService.getServerTime(),
      ...item
    });
  }

  public get carts()
  {
    return this._carts;
  }

  public get businessData()
  {
    return this._businessData;
  }

}
