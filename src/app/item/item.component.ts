import { Component, OnInit, Input } from '@angular/core';
import { Item } from './item';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from './items.service';
import { ItemDeleteSnackbarComponent } from './item-delete-snackbar/item-delete-snackbar.component';
import { MatSnackBar } from '@angular/material' 

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

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private itemsService: ItemsService) 
  {
    iconRegistry.addSvgIcon(
      'edit-icon', 
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/edit_icon.svg"));

    iconRegistry.addSvgIcon(
      'save-icon', 
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/save_icon.svg"));

    iconRegistry.addSvgIcon(
      'delete-icon', 
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/delete_icon.svg"));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
     this.form = this.formBuilder.group({
      name: [this.item.name? this.item.name : "Name", Validators.required],
      price: [this.item.price? this.item.price : "1", [Validators.required, Validators.pattern('[1-9][0-9]{0,3}')]],
      stock: [this.item.stock? this.item.stock : "2", [Validators.required, Validators.pattern('[0-9]{1,4}')]]
    });
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
      return;
    }

    this.isEdit = false;

    this.item.name = this.form.controls['name'].value;
    this.item.price = this.form.controls['price'].value;
    this.item.stock = this.form.controls['stock'].value;

    this.itemsService.updateItem(this.item);
  }

  btnOnDelete()
  {
    // let reference = this.snackBar.openFromComponent(ItemDeleteSnackbarComponent);
    let reference = this.snackBar.open("Are you sure you want to delete this item?", "Delete");
    reference.onAction().subscribe(() => alert("okay"))
  }

}
