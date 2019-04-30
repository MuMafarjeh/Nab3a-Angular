import { ItemCart } from './../item/item.cart';
import { Item } from 'src/app/item/item';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public doneLoadingCart = new Subject<boolean>();

  constructor(private firestore: AngularFirestore) 
  {
    this.doneLoadingCart.next(false);
  }

  private _carts: ItemCart[][] = [[]] as ItemCart[][];

  public async getCartsForUser(userID): Promise<void>
  {
    this.doneLoadingCart.next(false);

    const itemDocs = await this.firestore.collection('cart').ref
      .where('customerID', '==', userID).orderBy('businessID').get();

    let i: number = 0;
    if(!itemDocs.empty)
    {
      console.log("in cart")
      itemDocs.docs.map(a => {
        const id = a.id;
        const item = { id, ...a.data() } as ItemCart;
        this._carts.push([] as ItemCart[]);

        if(this._carts[i].find((oldItem) => oldItem.businessID != item.businessID))
        {
          i++;
          this._carts.push([] as ItemCart[]);
        }

        this._carts[i].push(item);
      });
    }

    this.doneLoadingCart.next(true);
    console.log(this._carts.length);
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

}
