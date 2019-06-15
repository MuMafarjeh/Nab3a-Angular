import { Location } from '@angular/common';
import { HttpService } from './../http/http.service';
import { UserCustomer } from './../user/usercustomer';
import { UserBusiness } from './../user/userbusiness';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from  'firebase';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserDelivery } from '../user/userdelivery';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private _user: User;
  private _userData: UserCustomer | UserBusiness | UserDelivery;

  private previousURL: string;  
  private static instance: AuthService;

  public doneLoadingUserAuth = new Subject<boolean>();

  constructor(private auth: AngularFireAuth, private router: Router, 
    private userService: UserService, private httpService: HttpService, private location: Location) 
  { 
    AuthService.instance = this;

    this.doneLoadingUserAuth.next(false);

    this.previousURL = this.location.path(true);

    this.auth.authState.subscribe(async (user) => 
    {
      if(user) //logged in
      {
        this._user = user;

        if(this._user.isAnonymous) //if anonymous
        {
          this._userData = await this.getUserDataAnon(this._user.uid);
        }
        else //if actual user
        {
          this._userData = await this.getUserData(this._user.uid);
        }

        if(this.previousURL)
        {
          this.router.navigate([this.previousURL]);
          this.previousURL = null;
        }
        else
        {
          this.router.navigate(["/"]);
        }
        this.doneLoadingUserAuth.next(true);
      }
      else //not logged in
      {
        await this.anonymousLogin();
        // console.log(anon);
      }
    }, (error) =>
    {
      console.error(error);
    })
  }

  private async anonymousLogin()
  {
    const credentials = await this.auth.auth.signInAnonymouslyAndRetrieveData();
    return credentials;
  }

  private async getUserData(uid: string): Promise<UserCustomer | UserBusiness | UserDelivery>
  {
    try
    {
      const userDoc = await this.userService.getUser(uid).toPromise();
      let doc = userDoc.data();
      const id = userDoc.id;
      if(!doc || !doc.type)
        doc = {type: ''};
        
      switch(doc.type)
      {
        case 'business': 
          return {id, ... doc} as UserBusiness;
          break;
          
        case 'delivery': 
          return {id, ... doc} as UserDelivery;
          break;

        case 'customer': 
        default:
          return {id, ... doc} as UserCustomer;
          break;
      }
    }
    catch(error)
    {
      console.error(error);
    }
  }

  private async getUserDataAnon(uid: string): Promise<UserCustomer>
  {
    try
    {
      const result = await this.userService.getUser(uid).toPromise();
      let doc = result.data();
      const id = result.id;
      if(!doc || !doc.type)
        doc = {type: ''};

      return {id, ... doc} as UserCustomer;
    }
    catch(error)
    {
      console.error(error);
    }
  }

  public get isLoggedIn(): boolean {
    return this._user !== null && !this._user.isAnonymous;
  }

  public get userType(): string
  {
    if(this._userData === null || this._userData === undefined)
      return null;
    else if(this._userData.type === null || this._userData.type === undefined || this._userData.type === 'undefined')
      return null;
    else
      return this._userData.type;
  }

  public get isVerified(): boolean
  {
    if(this._user === null || this._user === undefined)
      return false;
    return this._user.emailVerified;
  }

  public get userData(): UserCustomer | UserBusiness | UserDelivery
  {
    if(this._userData === null || this._userData === undefined)
      return null;
    else
      return this._userData;
  }

  public get userID(): string
  {
    // if(this.isLoggedIn)
      return this._user.uid;
    // else
    //   return '';
  }

  public static getUserID()
  {
    return AuthService.instance.userID;
  }

  //////////////////////////////////////

  public async register(user, password: string) 
  {
    user.password = password;
    // await this.auth.auth.signInWithEmailAndPassword(user.email, password);
    const result = await this.httpService.registerUser(user);
    // await this.sendEmailVerification();
    // this.router.navigate(['/']);
  }

  public async login(email: string, password: string) 
  {
    this.doneLoadingUserAuth.next(false);

    try
    {
      await this.auth.auth.signInWithEmailAndPassword(email, password);
    }
    catch(e)
    {
      console.log("error with email")
      console.error(e);
    }

    this.router.navigate(['/']);
  }

  public async sendEmailVerification() {
    await this.auth.auth.currentUser.sendEmailVerification()
    alert("Verification email sent");
    /* this.router.navigate(['admin/verify-email']); */
  }

  public async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.auth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  // public async loginWithPhone(phone: string) {
  //   try {
  //     await  this.auth.auth.signInWithPhoneNumber(phone)
  //     /* this.router.navigate(['admin/list']); */
  //   } catch (e) {
  //     alert("Error!"  +  e.message);
  //   }
  // }

  public async logout(){
    this.previousURL = this.router.url;
    this.doneLoadingUserAuth.next(false);
    
    this.router.navigate(['/customer-browse-items']).then(async () => 
    {
      this._user = null;
      this._userData = null;
      await this.auth.auth.signOut();
    })
  } 
}
