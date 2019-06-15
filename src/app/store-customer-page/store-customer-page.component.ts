import { CartService } from '../services/cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserBusiness } from '../user/userbusiness';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { Item } from 'src/app/item/item';
import { Router, NavigationEnd } from '@angular/router';
import { ItemsService } from '../item/items.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-store-customer-page',
  templateUrl: './store-customer-page.component.html',
  styleUrls: ['../item-customer-page/item-customer-page.component.scss']
})
export class StoreCustomerPageComponent implements OnInit{

  justLoaded: boolean = true;
  businessNotFound: boolean = false;
  otherItems: Item[];
  businessID: string;
  businessData: UserBusiness;
  newBusiness: boolean = true;

  quantity: number = 1;
  quantityForm: FormGroup;
  quantityModel: number = 1;

  navigationSubscription: Subscription;
  inCart: boolean;
  cartID: string;

  constructor(private itemsService: ItemsService, private router: Router,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private authService: AuthService,
    private userService: UserService, private formBuilder: FormBuilder) 
  { 
    iconRegistry.addSvgIcon(
      'add-to-cart-icon',
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/add_to_cart_icon.svg"));

      this.navigationSubscription = this.router.events.subscribe(async (e: any) => {
        this.businessID = this.router.url.split('/').pop();
       
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          try
          {
            if (this.newBusiness) {
              this.getBusinessInfo(this.businessID);
            }
            this.getItemsOfBusiness();
            
            
          }
          catch(e)
          {
            console.log("error", e);
          }
        }
      });

      this.justLoaded = true;
  }

  async ngOnInit() 
  {
    this.businessID = this.router.url.split('/').pop();

    this.getItemsOfBusiness();
    this.getBusinessInfo(this.businessID);
  
  }

  async getItemsOfBusiness()
  {
    let items: Item[] = await this.itemsService.getInventoryItemsOfBusiness(this.businessID);
    this.otherItems = items;
  }

  async getBusinessInfo(businessID: string)
  {
    this.businessData = await this.userService.getUser2(businessID) as UserBusiness;
    console.log(this.businessData)
    if (!this.businessData) 
      this.businessNotFound = true;

    console.log(this.businessNotFound)
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
}
