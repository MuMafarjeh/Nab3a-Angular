import { SearchService } from './../../search/search.service';
import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Item } from 'src/app/item/item';

@Component({
  selector: 'app-business-find-product',
  templateUrl: './business-find-product.component.html',
  styleUrls: ['./business-find-product.component.scss']
})
export class BusinessFindProductComponent implements OnInit {

  @Output()
  clickItemEvent = new EventEmitter();

  clickedItem: Item;

  // itemSearchSuggestion = { 
  //   'item-card': true, 
  //   'item-card-secondary': false 
  // }

  // itemInsert = { 
  //   'item-card': false, 
  //   'item-card-secondary': true 
  // }

  constructor(public MatDialogRef: MatDialogRef<BusinessFindProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private searchService: SearchService)
    {
    }

  ngOnInit() {
  }

  get searchConfig()
  {
    return this.searchService.globalItemSearchConfig;
  }

  showResults: boolean = false;
  query: string;

  clickOutsideDisabled = false;
  clickOutsideOn = ['click'];

  closeResults()
  {
    this.showResults = false;
  }

  onClickItem(item)
  {
    this.clickedItem = item;
    this.showResults = false;
    // this.MatDialogRef.close();
  }

  searchSubmit(query)
  {
    this.showResults = true;
  }

  addedNewItem(item: Item)
  {
    this.MatDialogRef.close(item);
  }

  addProductClicked()
  {
    this.MatDialogRef.close(null);
  }

}
