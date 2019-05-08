import { UserCustomer } from 'src/app/user/usercustomer';
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

  private userID: string;

  constructor(private firestore: AngularFirestore, private httpsService: HttpService, private snackbar: SnackbarService) 
  {
    this.doneLoadingCart.next(false);
  }

  private _carts: ItemCart[][] = [[]] as ItemCart[][];
  private _businessData: UserBusiness[] = [] as UserBusiness[];
  private _finalPrice: number[] = [] as number[];
  private _confirmed: boolean[] = [] as boolean[];

  public async getCartsForUser(userID: string): Promise<void>
  {
    this.userID = userID;

    this.doneLoadingCart.next(false);

    const result = await this.httpsService.getCartsForUser(userID);

    this._carts = result.carts;
    this._businessData = result.businessData;
    this._finalPrice = result.finalPrice;

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

  async updateQuantity(item: ItemCart): Promise<boolean>
  {
    let success: boolean = false;

    if(item.stock < item.quantity)
    {
      success = false;
      this.snackbar.openSnackbar(`Could not add to cart. You are ordering ${item.quantity} but there is only ${item.stock})`);
      return;
    }

    await this.firestore.doc(`cart/${item.cartID}`).update({quantity: item.quantity})
      .then(async () => {
        await this.getCartsForUser(this.userID);
        this.snackbar.openSnackbar(`Updated quantity to ${item.quantity}!`);
        success = true;
      }).catch(() => 
      {
        this.snackbar.openSnackbar(`Could not add ${item.name} to cart.`);
      });

      
  
    return success;
  }

  //TODO - fix item not getting deleted frontend-side after changing quantity in cart page 
  async removeItemFromCart(cartNum: number, itemNum: number)
  {
    const item = (this._carts[cartNum][itemNum] as ItemCart);
    const itemID = item.cartID;
    await this.firestore.doc(`cart/${itemID}`).update({valid: false}).then(() => {
      this._carts[cartNum].splice(itemNum, 1)
      if(this._carts[cartNum].length == 0)
      {
        this._carts.splice(cartNum, 1);
      }

      this._finalPrice[cartNum] -= item.quantity * item.price;
      
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

  public async confirmOrder(cartNum: number, customer: UserCustomer)
  {
    const result = await this.httpsService.confirmOrder(customer, this._businessData[cartNum].id); 
    if(result === false)
    {
      this.snackbar.openSnackbar(`Could not confirm order...`);
    }
    else
    {
      this.snackbar.openSnackbar(`Your order to ${this._businessData[cartNum].name} is now in progress!`);
      this.addConfirmed(cartNum);

      const orderedProducts = result.orderedProducts;
      const business = result.order.businessData;

      this._carts[cartNum] = [] as ItemCart[];
      this._carts[cartNum].push(...orderedProducts);
      this._businessData[cartNum] = business;
    }
  }

  private addConfirmed(cartNum: number)
  {
    this._confirmed[cartNum] = true;
  }

  public get carts()
  {
    return this._carts;
  }

  public get businessData()
  {
    return this._businessData;
  }

  public get finalPrice()
  {
    return this._finalPrice;
  }

  public get confirmed()
  {
    return this._confirmed;
  }

}
