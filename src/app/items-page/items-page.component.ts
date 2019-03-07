import { Component, OnInit } from '@angular/core';
import { Item } from '../item/item';
import { ItemsService } from '../item/items.service';


@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.scss']
})
export class ItemsPageComponent implements OnInit {

  items: Item[];

  constructor(private itemService: ItemsService) { }

  ngOnInit() {
    this.itemService.getInventory()
    .subscribe((result: any) =>
    {
      this.items = result;
      console.log(this.items)

    });
  }

}
