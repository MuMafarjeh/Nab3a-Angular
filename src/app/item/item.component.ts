import { Component, OnInit, Input } from '@angular/core';
import { Item } from './item';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;
  success: boolean = false;

  @Input()
  item: Item;

  isEdit: boolean = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private formBuilder: FormBuilder, private itemsService: ItemsService) 
  {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('[1-9][0-9]{0,3}')]],
      stock: ['', [Validators.required, Validators.pattern('[0-9]{1,4}')]]
    });

    iconRegistry.addSvgIcon(
      'edit-icon', 
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/edit_icon.svg"));

    iconRegistry.addSvgIcon(
      'save-icon', 
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/save_icon.svg"));
  }

  ngOnInit() {
  }

  getErrorName()
  {
    return this.form.controls['name'].hasError('required') ? 'Name is required' : '';
  } 

  getErrorPrice()
  {
    return this.form.controls['price'].hasError('required') ? 'Price is required' : 
      this.form.controls['price'].errors.pattern ? 'Price can only be (1-9999)' : '';
  }

  getErrorStock()
  {
    return this.form.controls['stock'].hasError('required') ? 'Stock is required' : 
      this.form.controls['stock'].errors.pattern ? 'Stock can only be (0-9999)' : '';
  }

  btnOnEdit()
  {
    this.isEdit = true;
  }

  btnOnSave()
  {
    this.onEnter();
  }

  onEnter()
  {
    if(this.form.invalid)
    {
      alert("fuck off");
      return;
    }

    this.isEdit = false;

    this.itemsService.updateItem(this.item);
  }

}
