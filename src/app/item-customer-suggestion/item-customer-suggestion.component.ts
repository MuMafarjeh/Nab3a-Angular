import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ItemsService } from '../item/items.service';
import { Item } from '../item/item';

@Component({
  selector: 'app-item-customer-suggestion',
  templateUrl: './item-customer-suggestion.component.html',
  styleUrls: ['./item-customer-suggestion.component.scss']
})
export class ItemCustomerSuggestionComponent implements OnInit {

  @Input()
  item: Item;

  @Output()
  closeResults = new EventEmitter();

  isEdit: boolean = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
     private itemsService: ItemsService, private router: Router
    )
  {
  }
  
  ngOnInit() {
  }

  async onClick()
  {
    await this.router.navigate([`item/${this.item.id}`]);
    this.closeResults.emit();
  }

}
