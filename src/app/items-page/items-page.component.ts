import { AuthService } from './../auth/auth.service';
import { BusinessFindProductComponent } from './business-find-product/business-find-product.component';
import { Component, OnInit } from '@angular/core';
import { Item } from '../item/item';
import { ItemsService } from '../item/items.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.scss']
})
export class ItemsPageComponent implements OnInit {

  items: Item[];

  constructor(private itemService: ItemsService, private router:Router, public dialog: MatDialog,
    private authService: AuthService) { }

  async ngOnInit() {
    this.items = await this.itemService.getInventory();
  }

  addProduct(){
    this.router.navigate(['./business-add-product']);
  }

  deleteItem(item: Item)
  {
    let index = this.items.indexOf(item);
    if (index !== -1) {
        this.items.splice(index, 1);
    }
  }

  findProduct(): void 
  {
    const dialog = this.dialog.open(BusinessFindProductComponent, 
    {
      data: this.authService.userID,
      width: '90%',
      height: '94%'
    });

    dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
