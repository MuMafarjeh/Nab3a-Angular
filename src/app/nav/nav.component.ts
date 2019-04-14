import { SearchService } from './../search/search.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, ViewChild, Renderer2, ElementRef, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  host: {
    '(document:keydown.escape)': 'onEsc($event)',
  },
})
export class NavComponent implements OnInit {

  appTitle = 'نبعة';

  username: string;

  canLogout: boolean;

  isBusiness: boolean;
  isCustomer: boolean;

  isVerified: boolean;

  constructor(private authService: AuthService, private searchService: SearchService) 
  { 
    this.outsideClickHandler = this.outsideClickHandler.bind(this);
  }

  ngOnInit() 
  {
    this.canLogout = this.authService.isLoggedIn;

    let userType = this.authService.userType;
    this.isBusiness = userType === 'business';
    this.isCustomer = userType === 'customer';

    this.isVerified = this.authService.isVerified;

    this.username = this.authService.userData.name;
  }

  logout() {
    this.authService.logout();
  }

  get searchConfig()
  {
    return this.searchService.allSearchConfig;
  }

  showResults = false;

  query: string;


  searchSubmit(query)
  {
    this.showResults = true;
  }

  onEsc(event)
  {  
    this.showResults = false;
    
  }

  clickOutsideDisabled = false;
  clickOutsideOn = ['click'];

  outsideClickHandler()
  {
    this.showResults = false;
  }

  closeResults()
  {
    this.showResults = false;
  }

}
