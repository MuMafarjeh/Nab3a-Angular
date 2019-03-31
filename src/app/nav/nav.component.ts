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

  canLogout: boolean;
  loggedInSubscription: Subscription;

  isBusiness: boolean;
  isBusinessSubscription: Subscription;

  isVerified: boolean;
  isVerifiedSubscription: Subscription;

  constructor(private authService: AuthService) 
  { 
    this.loggedInSubscription = this.authService.getLoggedIn.subscribe((loggedIn) => 
    {
      this.canLogout = loggedIn;
    });

    this.isBusinessSubscription = this.authService.getUserType.subscribe((userType) =>
    {
      this.isBusiness = userType === 'business';
    });

    this.isVerifiedSubscription = this.authService.getIsVerified.subscribe((isVerified) =>
    {
      this.isVerified = isVerified;
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
  }

}
