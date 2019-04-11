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
  userAnon: User;
  userLocalStorage: string;

  public getLoggedIn = new Subject<boolean>();
  public getUserType = new Subject<string>();
  public getIsVerified = new Subject<boolean>();
  public getUserData = new Subject<any>();

  public getCanLoadData = new Subject<boolean>();
  anonCredentials: string;

  constructor(private auth: AngularFireAuth, private router: Router, 
    private userService: UserService, private httpService: HttpService) 
  { 
    this.anonymousLogin().then(() => {

      console.log('inside anonymous login')

      this.auth.authState.subscribe(async user => {

        console.log('inside authstate')
        console.log(user);

        if(user)
        {
          const stringifiedUser = JSON.stringify(user);
          if(!user.isAnonymous)
          {
            this.user = user;
            localStorage.setItem('user', stringifiedUser);
          }
          else
          {
            this.userAnon = user;
            localStorage.setItem('userAnon', stringifiedUser);
            this.userData = await this.getUserDataAnon();
          }

          

          this.changeStatus();
        }
      });
    });
    
    console.log("auth service change status")
    this.changeStatus();

    console.log("auth service user:")
    this.auth.user.toPromise().then((user) => {
      console.log(user);
    })

    // this.auth.authState.subscribe(async user => {

    //   if (user){
       
    //     this.user = user;
        
    //     if(this.user.isAnonymous)
    //       localStorage.setItem('userAnon', JSON.stringify(this.user));
    //     else
    //       localStorage.setItem('user', JSON.stringify(this.user));
    //     this.readUserDataFromLocalStorage();
    //   } else {
    //     await this.anonymousLogin();
    //     this.readUserDataFromLocalStorage();
    //     await this.getUserDataAnon();
    //   }

    //   this.changeStatus();
    // });
  }

  async anonymousLogin() {
    this.readUserDataFromLocalStorage();

    console.log("inside my fucking ass")

    if(!this.userAnon)
    {
      const anonCredentials = await this.auth.auth.signInAnonymously();
      console.log(anonCredentials);
      this.anonCredentials = await anonCredentials.user.getIdToken();
      localStorage.setItem('anonCred', JSON.stringify(this.anonCredentials));
      
    }
    else if(!this.user)
    {
      console.log(this.anonCredentials);
      await this.auth.auth.signInAnonymously();
    }
    else
    {
      localStorage.setItem('user', JSON.stringify(this.user));
      this.readUserDataFromLocalStorage();
    }

    
  }

  public async register(user, password: string) {
    user.password = password;
    let emailLink = await this.httpService.registerUser(user);
    await this.auth.auth.signInWithEmailAndPassword(user.email, password);
    // await this.sendEmailVerification();
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
          let doc = result.data();
          const id = result.id;
          if(!doc || !doc.type)
            doc = {type: ''};
            
          switch(doc.type)
          {
            case 'business': 
              this.userData = {id, ... doc} as UserBusiness;
              localStorage.setItem('userData', JSON.stringify(this.userData));
              console.log(`Businss ${this.userData.name} logged in! \n`);
              break;
              
            case 'delivery': 
              this.userData = {id, ... doc};
              console.log(`Delivery-man ${this.userData.name} logged in!`);
              break;

            case 'customer': 
            default:
              this.userData = {id, ... doc} as UserCustomer;
              localStorage.setItem('userData', JSON.stringify(this.userData));
              console.log(`Customer ${this.userData.name} logged in!`);
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

    // localStorage.removeItem('userData');
    // await this.getUserDataAnon();

    // this.changeStatus();

    this.user = null;
    this.userData = null;

    this.changeStatus();

    this.router.navigate([this.router.url]);
  } 

  get isLoggedIn(): boolean {
    this.userLocalStorage  =  JSON.parse(localStorage.getItem('user'));


    return  this.userLocalStorage  !==  null;
  }

  async getUserDataAnon()
  {
    await this.userService.getUser(this.userAnon.uid).subscribe((result) => {
      let doc = result.data();
      const id = result.id;
      if(!doc || !doc.type)
        doc = {type: ''};

      this.userData = {id, ... doc} as UserCustomer;
      localStorage.setItem('userData', JSON.stringify(this.userData));
      console.log(`Customer ${this.userData.name} logged in!`);
    }, (err) =>
    {
      localStorage.setItem('userData', "");
    });
  }

  get userType(): any
  {
    // this.readUserDataFromLocalStorage();
    if(this.userData === null || this.userData === undefined || this.userData === 'undefined')
      return null;
    else if(this.userData.type === null || this.userData.type === undefined || this.userData.type === 'undefined')
      return null;
    else
      return this.userData.type;
  }

  get isVerified(): boolean
  {
    // this.readUserDataFromLocalStorage();
    if(this.user === null || this.user === undefined)
      return false;
    return this.user.emailVerified;
  }

  changeStatus()
  {
    // console.log(`this.isLoggedIn ${this.isLoggedIn}`)
    this.readUserDataFromLocalStorage();

    this.getLoggedIn.next(this.isLoggedIn);
    this.getUserType.next(this.userType);
    this.getIsVerified.next(this.isVerified);
    this.getUserData.next(this.userData);
    this.getCanLoadData.next(this.canLoadData);
  }

  get canLoadData() {
    // this.readUserDataFromLocalStorage();
    return this.userAnon != null || this.user != null;
  }

  readUserDataFromLocalStorage()
  {
    const userData = localStorage.getItem('userData');
    this.userData = userData? JSON.parse(userData): null;

    const userAnon = localStorage.getItem('userAnon');
    this.userAnon = userAnon? JSON.parse(userAnon): null;
    
    const user = localStorage.getItem('user');
    this.user = user? JSON.parse(user): null;

    const anonCred = localStorage.getItem('anonCred');
    this.anonCredentials = anonCred? JSON.parse(anonCred): null;
  }

  async getUserID()
  {
    if(await this.isLoggedIn)
      return await this.user.uid;
    else
      return await this.userAnon.uid;
  }
}
