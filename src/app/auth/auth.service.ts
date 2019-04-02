import { HttpService } from './../http/http.service';
import { UserCustomer } from './../user/usercustomer';
import { UserBusiness } from './../user/userbusiness';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from  'firebase';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  user: User;
  userData: any;
  userLocalStorage: string;

  public getLoggedIn = new Subject<boolean>();
  public getUserType = new Subject<string>();
  public getIsVerified = new Subject<boolean>();
  public getUserData = new Subject<any>();

  constructor(private auth: AngularFireAuth, private router: Router, 
    private userService: UserService, private httpService: HttpService) 
  { 
    this.auth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.readUserDataFromLocalStorage();
      } else {
        localStorage.setItem('user', null);
      }

      this.changeStatus();
    });
  }

  public async register(user, password: string) {
    user.password = password;
    let emailLink = await this.httpService.registerUser(user);
    console.log("after register called, before sign in")
    await this.auth.auth.signInWithEmailAndPassword(user.email, password);
    console.log("before send email verification")
    await this.sendEmailVerification();
    console.log("after send email verif")
    this.router.navigate(['/']);
  }

  // public async register(email: string, password: string) {
  //   var result = await this.auth.auth.createUserWithEmailAndPassword(email, password)
  //   this.sendEmailVerification();
  //   return result;
  // }

  async login(email: string, password: string) {
    try{
      await this.auth.auth.signInWithEmailAndPassword(email, password).then((result) => 
      {
        this.userService.getUser(result.user.uid).subscribe((result) => {
          const doc = result.docs.pop();
          const id = doc.id;
          switch(doc.get("type"))
          {
            case 'business': 
              this.userData = {id, ... doc.data()} as UserBusiness;
              localStorage.setItem('userData', JSON.stringify(this.userData));
              console.log(`Businss ${this.userData.name} logged in! \n`);
              break;
              
            case 'customer': 
              this.userData = {id, ... doc.data()} as UserCustomer;
              localStorage.setItem('userData', JSON.stringify(this.userData));
              console.log(`Customer ${this.userData.name} logged in!`);
              break;

            case 'delivery': 
              this.userData = {id, ... doc.data()};
              console.log(`Delivery-man ${this.userData.name} logged in!`);
              break;
          }
          
          this.changeStatus();
          this.router.navigate(['/']);
        })
        
        }).catch ((e) =>  {
          return e;
        });
      }catch(e)
      {
        return e;
      }
  }

  // async login(email: string, password: string) {
  //   try {
  //     await this.auth.auth.signInWithEmailAndPassword(email, password).then((result) => 
  //     {
  //       this.userService.getUser(result.user.uid).subscribe((result2) => {
  //         const doc = result2;
  //         const id = result.user.uid;
  //         switch(doc.data().type)
  //         {
  //           case 'business': 
  //             this.userData = {id, ... doc.data()} as UserBusiness;
  //             localStorage.setItem('userData', JSON.stringify(this.userData));
  //             console.log(`Businss ${this.userData.name} logged in! \n`);
  //             break;
              
  //           case 'customer': 
  //             this.userData = {id, ... doc.data()} as UserCustomer;
  //             localStorage.setItem('userData', JSON.stringify(this.userData));
  //             console.log(`Customer ${this.userData.name} logged in!`);
  //             break;

  //           case 'delivery': 
  //             this.userData = {id, ... doc.data()};
  //             console.log(`Delivery-man ${this.userData.name} logged in!`);
  //             break;
  //         }
          
  //         this.changeStatus();
  //         this.router.navigate(['/']);
  //       })
        
  //     });
  //     /* this.router.navigate(['admin/list']); */
  //   } catch (e) {
  //     alert("Error!"  +  e.message);
  //   }
  // }

  // async loginWithPhone(phone: string) {
  //   try {
  //     await  this.auth.auth.signInWithPhoneNumber(phone)
  //     /* this.router.navigate(['admin/list']); */
  //   } catch (e) {
  //     alert("Error!"  +  e.message);
  //   }
  // }

  async sendEmailVerification() {
    await this.auth.auth.currentUser.sendEmailVerification()
    alert("Verification email sent");
    /* this.router.navigate(['admin/verify-email']); */
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.auth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout(){
    await this.auth.auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('userData');

    this.changeStatus();
    this.router.navigate(['/']);
  } 

  get isLoggedIn(): boolean {
    this.userLocalStorage  =  JSON.parse(localStorage.getItem('user'));
    return  this.userLocalStorage  !==  null;
  }

  get userType(): any
  {
    this.readUserDataFromLocalStorage();
    if(this.userData === null || this.userData === undefined || this.userData === 'undefined')
      return null;
    else if(this.userData.type === null || this.userData.type === undefined || this.userData.type === 'undefined')
      return null;
    else
      return this.userData.type;
  }

  get isVerified(): boolean
  {
    this.readUserDataFromLocalStorage();
    if(this.user === null || this.user === undefined)
      return false;
    return this.user.emailVerified;
  }

  changeStatus()
  {
    // console.log(`this.isLoggedIn ${this.isLoggedIn}`)
    this.getLoggedIn.next(this.isLoggedIn);
    this.getUserType.next(this.userType);
    this.getIsVerified.next(this.isVerified);
    this.getUserData.next(this.userData);
  }

  readUserDataFromLocalStorage()
  {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  async getUserID()
  {
    if(await this.isLoggedIn)
      return await this.user.uid;
  }
}
