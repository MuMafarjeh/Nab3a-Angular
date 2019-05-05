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

    this.firestore.collection('cart').ref
      .where('customerID', '==', userID).orderBy('businessID').onSnapshot((result) => 
      {
        let itemDocs = result.docChanges();
        let i: number = 0;
        if(itemDocs.length > 0)
        {
          itemDocs.forEach(a => {
            const id = a.doc.id;
            const item = { id, ...a.doc.data() } as ItemCart;

            if(this._carts[i][0] && this._carts[i][0].businessID != item.businessID)
            {
              i++;
              this._carts.push([] as ItemCart[]);
            }

            this._carts[i].push(item);
          });
        }
      }, 
      (e) => {
        console.log("cart error", e);
      });

    this.doneLoadingCart.next(true);
    console.log(this._carts);
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
