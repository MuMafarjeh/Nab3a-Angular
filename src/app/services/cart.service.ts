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

    this.fillConfirmed();

    this.doneLoadingCart.next(true);
  }

  async addInventoryItemToCart(item: Item, quantity: number, 
      userID: string, inCart: boolean, cartID: string): Promise<boolean>
  {
    let success: boolean = false;

    let cartIndex = this.getCartIndex(item);
    if(this.getConfirmed(cartIndex))
    {
      this.snackbar.openSnackbar(`Could not add to cart. You already have an ongoing order from ${this._businessData[cartIndex].name}.`);
      return success;
    }

    if(item.stock < quantity)
    {
      this.snackbar.openSnackbar(`Could not add to cart. You are ordering ${quantity} but there is only ${item.stock})`);
      return success;
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
      this._finalPrice[cartNum] -= item.quantity * item.price;

      if(this._carts[cartNum].length == 0)
      {
        this._carts.splice(cartNum, 1);
        this._confirmed.splice(cartNum, 1);
        this._businessData.splice(cartNum, 1);
        this._finalPrice.splice(cartNum, 1);
      }

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

  getCartIndex(myItem: Item)
  {
    let index = null;
    this._carts.forEach((cart, i) => {
      if(cart.length > 0 && myItem.businessID == cart[0].businessID)
        index = i;
        return index;
    });

    return index;
  }

  private fillConfirmed()
  {
    this._carts.forEach((cart, i) => {
      if(cart.length > 0 && cart[0].status != null && cart[0].status != undefined)
        this._confirmed[i] = true;     
    });
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

  public async cancelOrder(cartNum: number)
  {
    const orderID = this._carts[cartNum][0].orderID;

    console.log(orderID);

    if(!orderID || orderID === undefined)
    {
      console.error("not an order");
      return;
    }

    await this.firestore.doc(`order/${orderID}`).update({ valid: false }).then(() => {
      this._carts.splice(cartNum, 1);
    });
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

  public getConfirmed(i: number): boolean
  {
    if(!this._carts[i])
      return false;
      
    return (this._confirmed && this._confirmed[i] != null && this._confirmed[i] != undefined && this._confirmed[i]);
  }

}
