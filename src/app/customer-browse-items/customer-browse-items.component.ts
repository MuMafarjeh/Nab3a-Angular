import { Component, OnInit } from '@angular/core';
import { category } from './category';
import { CategoryService } from '../services/category.service';
import { User } from 'firebase';
import { UserService } from '../user/user.service';
import { ItemsService } from '../item/items.service';
import { Item } from '../item/item';

@Component({
  selector: 'app-customer-browse-items',
  templateUrl: './customer-browse-items.component.html',
  styleUrls: ['./customer-browse-items.component.scss']
})
export class CustomerBrowseItemsComponent implements OnInit {

  category: category[];
  categoryBusiness: category[] = [];
  categoryProducts: category[] = [];

  users: User[];

  items: Item[];

  currentCategory:string;
  

  constructor(private categoryServic: CategoryService,private userServic: UserService,private itemServic: ItemsService) {

  }

  ngOnInit() {
    this.getMyCategory();
    
  }

  async getMyCategory() {

    this.category = await this.categoryServic.getMyCategory();
    console.log(this.category.length);
    for (var i = 1; i <= this.category.length; i++) {
      var checkCategory = this.category.pop();
      if (checkCategory.type == "business") {
        this.categoryBusiness.push(checkCategory);
      }
      else if (checkCategory.type == "product") {
        this.categoryProducts.push(checkCategory);
      }

    }

  }

  async onClick(category) {
    this.users = await this.userServic.getUsersByCategory(category.name);
    this.currentCategory = 'business';
  }
  async brawseByBusiness(category){
    this.items = await this.itemServic.getProductsByCategory(category.name);
    this.currentCategory = 'product';
  }


}
