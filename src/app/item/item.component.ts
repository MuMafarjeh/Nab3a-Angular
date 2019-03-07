import { Component, OnInit, Input } from '@angular/core';
import { Item } from './item';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input()
  item: Item;

  isEdit: boolean = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) 
  {
    iconRegistry.addSvgIcon(
      'edit-icon', 
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/edit_icon.svg"))
  }

  ngOnInit() {
  }

  btnToggleEdit()
  {
    this.isEdit = !this.isEdit;
  }

  onEnter()
  {
    this.isEdit = !this.isEdit;
  }

}
