import { UtilityService } from './../services/utility.service';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from './item';
import { MatIconRegistry, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from './items.service';
import { ItemDeleteSnackbarComponent } from './item-delete-snackbar/item-delete-snackbar.component';
import { MatBottomSheet } from '@angular/material'

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

  @Input()
  isNew: boolean = false;

  @Output()
  deleteEvent: EventEmitter<any> = new EventEmitter();

  @Output()
  hasAdded: EventEmitter<Item> = new EventEmitter(); 

  @Input()
  isEdit: boolean = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private bottomSheet: MatBottomSheet, private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private itemsService: ItemsService,
    private authService: AuthService
    )
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
    if(this.isNew)
    {
      if(this.item.price == null)
        this.item.price = 1;
      if(this.item.stock == null)
        this.item.stock = 1;

      this.form = this.formBuilder.group({
        // name: [this.item.name? this.item.name : "Name", Validators.required],
        price: [this.item.price? this.item.price : "1", [Validators.required, Validators.pattern('[1-9][0-9]{0,3}')]],
        stock: [this.item.stock? this.item.stock : "2", [Validators.required, Validators.pattern('[0-9]{1,4}')]]
      });
    }
  }

  ngAfterViewInit() {
    if(!this.isNew)
    {
      this.form = this.formBuilder.group({
        // name: [this.item.name? this.item.name : "Name", Validators.required],
        price: [this.item.price? this.item.price : "1", [Validators.required, Validators.pattern('[1-9][0-9]{0,3}')]],
        stock: [this.item.stock? this.item.stock : "2", [Validators.required, Validators.pattern('[0-9]{1,4}')]]
      });
    }

  }

  // getErrorName()
  // {
  //   return this.form.controls['name'].hasError('required') ? 'Name is required' : '';
  // }

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

  async btnOnSave()
  {
    if(this.form.invalid)
    {
      return;
    }

    this.item.price = this.form.controls['price'].value;
    this.item.stock = this.form.controls['stock'].value;

    if(!this.isNew)
    {
      this.isEdit = false;

      await this.itemsService.updateItem(this.item);
    }
    else
    {
      this.item = UtilityService.removeExtraAttributesAlgolia(this.item);

      this.item = await this.itemsService.addInventoryItem(this.item);

      this.hasAdded.emit(this.item);
    }
  }

  onEnter()
  {
    this.btnOnSave()
  }

  btnOnDelete(item: Item)
  {
    let ref = this.bottomSheet.open(ItemDeleteSnackbarComponent,
    {
      data: item
    });

    ref.afterDismissed().subscribe(data => {
      if(data && data.message)
      {
        this.itemsService.deleteItem(this.item)
        .finally(() => {
          this.deleteEvent.emit(this.item);
          this.snackBar.open(this.item.name + " deleted!", "", {duration: 1500})
        });
      }
      else if(data && !data.message) {

      }
    })
  }

}
