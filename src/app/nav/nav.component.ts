import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  appTitle = 'Nab3a';

  username: string;
  userDataSubscription: Subscription;

  canLogout: boolean;
  loggedInSubscription: Subscription;

  isBusiness: boolean;
  isCustomer: boolean;
  isUserTypeSubscription: Subscription;

  isVerified: boolean;
  isVerifiedSubscription: Subscription;

  constructor(private authService: AuthService) 
  { 
    this.loggedInSubscription = this.authService.getLoggedIn.subscribe((loggedIn) => 
    {
      this.canLogout = loggedIn;
    });

    this.isUserTypeSubscription = this.authService.getUserType.subscribe((userType) =>
    {
      this.isBusiness = userType === 'business';
      this.isCustomer = userType === 'customer';
    });

    this.isVerifiedSubscription = this.authService.getIsVerified.subscribe((isVerified) =>
    {
      this.isVerified = isVerified;
    });

    this.userDataSubscription = this.authService.getUserData.subscribe((userData) => {
      if(userData == null)
        this.username = null;
      else
        this.username = userData.name;
    });
  }

  ngOnInit() {
  }

  logout()
  {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
    this.isUserTypeSubscription.unsubscribe();
    this.isVerifiedSubscription.unsubscribe();
    this.userDataSubscription.unsubscribe();
  }
}
