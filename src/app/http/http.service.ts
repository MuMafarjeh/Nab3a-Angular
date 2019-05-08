import { UserCustomer } from './../user/usercustomer';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCart } from 'functions/src/item.cart';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private getCartsCallable: (data: any) => Observable<any>;
  private registerUserCallable: (userid: any) => Observable<any>;
  private updateCartQuantityCallable: (data: any) => Observable<any>;
  private customerConfirmOrderCallable: (data: any) => Observable<any>;

  constructor(private functions: AngularFireFunctions) {
    this.registerUserCallable = this.functions.httpsCallable('register');
    this.getCartsCallable = this.functions.httpsCallable('getCartsForUser');
    this.updateCartQuantityCallable = this.functions.httpsCallable('updateCartQuantity');
    this.customerConfirmOrderCallable = this.functions.httpsCallable('customerConfirmOrder');
  }

  async registerUser(userInfo: any): Promise<string>
  {
    userInfo.emailVerified = false;
    return await this.registerUserCallable(userInfo).toPromise();
  }

  public async getCartsForUser(userID)
  {
    return await this.getCartsCallable(userID).toPromise();
  }

  public async updateCartQuantity(item: ItemCart): Promise<boolean>
  {
    return await this.updateCartQuantityCallable(item).toPromise();
  }

  public async confirmOrder(customer: UserCustomer, businessID: string) 
  {
    return await this.customerConfirmOrderCallable({
      customer: customer,
      businessID: businessID
    }).toPromise();
  }

}
