import { AuthService } from './../auth/auth.service';
import { Item } from 'src/app/item/item';
import { Router, Routes, NavigationEnd } from '@angular/router';
import { ItemsService } from './../item/items.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Refreshable } from '../services/refreshable';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-item-customer-page',
  templateUrl: './item-customer-page.component.html',
  styleUrls: ['./item-customer-page.component.scss']
})
export class ItemCustomerPageComponent implements OnInit{

  item: Item;
  navigationSubscription: Subscription;
  justLoaded: boolean = true;
  itemNotFound: boolean = false;;

  constructor(private itemsService: ItemsService, private router: Router,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private authService: AuthService) 
  { 
    iconRegistry.addSvgIcon(
      'add-to-cart-icon',
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/add_to_cart_icon.svg"));

      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.getItemData()
        }
      });

      this.justLoaded = true;
  }

  ngOnInit() 
  {

    this.getItemData();
  }

  btnOrder()
  {

  }

  async getItemData()
  {
    console.log("getItemData")
    await this.itemsService.getInventoryItem(this.router.url.split('/').pop()).then((item) => 
    {
      this.item = item;
      this.itemNotFound = false;
      this.justLoaded = false;
    }, (err) =>
    {
      // console.log(err);
      this.itemNotFound = true;
      this.justLoaded = false;
      this.item = null;
    });
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
}
