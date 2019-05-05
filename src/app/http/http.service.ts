import { AngularFireFunctions } from '@angular/fire/functions';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private getCartsCallable: (data: any) => Observable<any>;
  private registerUserCallable: (userid: any) => Observable<any>;

  constructor(private httpClient: HttpClient, private functions: AngularFireFunctions) {
    this.registerUserCallable = this.functions.httpsCallable('register');
    this.getCartsCallable = this.functions.httpsCallable('getCartsForUser');
  }

  async registerUser(userInfo: any): Promise<string>
  {
    // console.log("before register called")
    userInfo.emailVerified = false;
    return await this.registerUserCallable(userInfo).toPromise();
  }

  public async getCartsForUser(userID): Promise<any>
  {
    return await this.getCartsCallable(userID).toPromise();
  }

}
