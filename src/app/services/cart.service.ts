import { SnackbarService } from './snackbar.service';
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

  constructor(private firestore: AngularFirestore, private httpsService: HttpService, private snackbar: SnackbarService) 
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

    // console.log(this._carts[0][0]);

    this.doneLoadingCart.next(true);
  }

  async addInventoryItemToCart(item: Item, quantity: number, 
      userID: string, inCart: boolean, cartID: string): Promise<boolean>
  {
    let success: boolean = false;

    if(item.stock < quantity)
    {
      success = false;
      this.snackbar.openSnackbar(`Could not add to cart. You are ordering ${quantity} but there is only ${item.stock})`);
      return;
    }

    if(!inCart)
    {
      await this.firestore.collection('cart').add({
        customerID: userID,
        quantity: quantity,
        timeCreated: UtilityService.getServerTime(),
        valid: true,
        ...item
      }).then(async () => {
        await this.getCartsForUser(userID);
        this.snackbar.openSnackbar(`Added ${quantity} ${item.name} to cart!`);
        success = true;
      });
    }
    else
    {
      let itemInCart = item as ItemCart;
      itemInCart.quantity = quantity;
      itemInCart.cartID = cartID;

      await this.httpsService.updateCartQuantity(itemInCart)
        .then(async (result: boolean) => {
          if(!result)
          {
            this.snackbar.openSnackbar(`Could not add ${itemInCart.name} to cart.`);
            return;
          }

          await this.getCartsForUser(userID);
          this.snackbar.openSnackbar(`Added ${quantity} more of ${itemInCart.name} to cart!`);
          success = true;
        });
    }

    return success;
  }

  async removeItemFromCart(cartNum: number, itemNum: number)
  {
    const item = (this._carts[cartNum][itemNum] as ItemCart);
    const itemID = item.cartID;
    await this.firestore.doc(`cart/${itemID}`).update({valid: false}).then(() => {
      console.log(this._carts[cartNum].splice(itemNum, 1));
      if(this._carts[cartNum].length == 0)
        this._carts.splice(cartNum, 1);

      this.snackbar.openSnackbar(`Removed ${item.name} from cart!`);
    }).catch((e) => {
      console.log(e);
    });
  }

  getInCart(myItem: Item): string
  {
    let cartID: string;
    this._carts.forEach((cart) => {
      cart.forEach((item) => {
        if(myItem.id == item.id)
        {
          cartID = item.cartID;
          return cartID;
        }
      })
    });

    return cartID;
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
