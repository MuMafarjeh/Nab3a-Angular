import { AuthService } from './../auth/auth.service';
import { Item } from 'src/app/item/item';
import { Router } from '@angular/router';
import { ItemsService } from './../item/items.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-item-customer-page',
  templateUrl: './item-customer-page.component.html',
  styleUrls: ['./item-customer-page.component.scss']
})
export class ItemCustomerPageComponent implements OnInit {

  item: Item;

  constructor(private itemsService: ItemsService, private router: Router, 
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private authService: AuthService) 
  { 
    iconRegistry.addSvgIcon(
      'add-to-cart-icon',
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/add_to_cart_icon.svg"));

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
    await this.itemsService.getInventoryItem(this.router.url.split('/').pop()).then((item) => 
    {
      this.item = item;
    }, (err) =>
    {
      console.log(err);
    });
  }
}
