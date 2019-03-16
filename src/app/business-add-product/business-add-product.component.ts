import { ItemsService } from './../item/items.service';
import { Item } from './../item/item';
import { StorageService } from './../storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, } from '@angular/forms';
import * as firebase from 'firebase';
import { Observable, observable } from 'rxjs';
import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-business-add-product',
  templateUrl: './business-add-product.component.html',
  styleUrls: ['./business-add-product.component.scss']
})
export class BusinessAddProductComponent implements OnInit {


  public data =  {} as Item;
  public categories = [];

  submitted = false;

  addProductForm: FormGroup;

 // collection :  Observable<Item[]>;


  public imagePath;
  imageFile;
  imgURL: any;
  public message: string;
  Name = new FormControl('', [Validators.required ]);
  Barcode = new FormControl('', [Validators.required ]);
  Price = new FormControl('', [Validators.required ]);
  Stock = new FormControl('', [Validators.required ]);
  CategoryControl = new FormControl('', [Validators.required]);
  Image= new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder, private itemService: ItemsService , private storage: StorageService) { }


  getErrorMessage() {
    return this.Name.hasError('required') ? 'You must enter a Name' :
        this.Name.hasError('Tags') ? 'Not a valid Name' :
            '';
  }
  getErrorMessageTags() {
    return this.Barcode.hasError('required') ? 'You must enter a Tags' :
        this.Barcode.hasError('Tags') ? 'Not a valid Tags' :
            '';
  }
  getErrorMessagePrice() {
    return this.Price.hasError('required') ? 'You must enter a Price' :
        this.Price.hasError('Price') ? 'Not a valid Price' :
            '';
  }

  getErrorMessageStock() {
    return this.Stock.hasError('required') ? 'You must enter a Stock' :
        this.Stock.hasError('Stock') ? 'Not a valid Stock' :
            '';
  }
  getErrorMessageImage() {
    return this.Image.hasError('required') ? 'You must enter a Image' :
        this.Image.hasError('Image') ? 'Not a valid Image' :
            '';
  }
  ngOnInit() {

  this.categories = this.itemService.getCategory();

// tslint:disable-next-line: align
      this.addProductForm = this.formBuilder.group({
        Name: ['', Validators.required],
        Barcode: ['', Validators.required],
        Price: ['', Validators.required],
        Stock: ['', Validators.required],
        CategoryControl: ['', Validators.required],
        Image: ['', Validators.required],
    });

  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addProductForm.invalid) {
        return ;
    }
  ///  this.data;
    this. data.name = this.addProductForm.get('Name').value;
    this. data.barcode = this.addProductForm.get('Barcode').value;
     this.  data.category = this.addProductForm.get("CategoryControl").value;
    this.data.price = this.addProductForm.get('Price').value;
    this. data.stock = this.addProductForm.get('Stock').value;
    this. data.type = ' product';
    this.storage.uploadImageProduct(this.imageFile, this.data.name)
    // downloadURL.subscribe((observer) =>
    // {
    //   console.log(observer);
    // });

          // console.log(downloadURL)
          // this.data.image = res;
          // this.itemService.addItem(this.data);
          // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addProductForm.value))

  }

onClear() {

  this.addProductForm.reset();
  this.imgURL='';
}


  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }



    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.imageFile = files[0];
    }
}
}
