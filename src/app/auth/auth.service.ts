import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from  'firebase/app';
import { User } from  'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(private auth: AngularFireAuth) 
  { 
    this.auth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  public async register(email: string, password: string) {
    var result = await this.auth.auth.createUserWithEmailAndPassword(email, password)
    this.sendEmailVerification();
  }

  async login(email: string, password: string) {
    try {
      await  this.auth.auth.signInWithEmailAndPassword(email, password)
      /* this.router.navigate(['admin/list']); */
    } catch (e) {
      alert("Error!"  +  e.message);
    }
  }

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
    /* this.router.navigate(['admin/login']); */
  } 

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }
}
