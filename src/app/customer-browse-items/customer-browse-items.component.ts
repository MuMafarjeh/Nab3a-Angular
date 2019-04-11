import { Component, OnInit } from '@angular/core';
import { category } from './category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-customer-browse-items',
  templateUrl: './customer-browse-items.component.html',
  styleUrls: ['./customer-browse-items.component.scss']
})
export class CustomerBrowseItemsComponent implements OnInit {

  category: category[];
  
  constructor(private categoryServic: CategoryService) { }

  ngOnInit() {
    this.getMyCategory();
  }

  getMyCategory() {
    this.category = this.categoryServic.getMyCategory();
  }

  onClick(category)
  {
    console.log(category.id);
  }


}
