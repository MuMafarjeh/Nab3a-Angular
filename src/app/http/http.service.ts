import { AngularFireFunctions } from '@angular/fire/functions';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  registerUserCallable;

  constructor(private httpClient: HttpClient, private functions: AngularFireFunctions) {
    this.registerUserCallable = this.functions.httpsCallable('register');
  }

  async registerUser(userInfo: any): Promise<string>
  {
    console.log("before register called")
    userInfo.emailVerified = false;
    return await this.registerUserCallable(userInfo).toPromise();
  }

}
