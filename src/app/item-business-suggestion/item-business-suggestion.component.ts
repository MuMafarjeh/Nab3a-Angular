import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ItemsService } from '../item/items.service';
import { Item } from '../item/item';

@Component({
  selector: 'app-item-business-suggestion',
  templateUrl: './item-business-suggestion.component.html',
  styleUrls: ['./item-business-suggestion.component.scss']
})
export class ItemBusinessSuggestionComponent implements OnInit {

  @Input()
  item: Item;

  @Output()
  onClickItem = new EventEmitter<Item>();

  isEdit: boolean = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
     private itemsService: ItemsService, private router: Router
    )
  {
    
  }
  
  ngOnInit() {
    
  }

  onClick()
  {
    console.log(`clicked item suggestion: ${this.item.name}`)
    this.onClickItem.emit(this.item);
  }

}
