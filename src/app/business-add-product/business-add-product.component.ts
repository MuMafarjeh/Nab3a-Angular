import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, } from '@angular/forms';
import { Item } from '../item/item';
import { ItemsService } from '../item/items.service';

@Component({
  selector: 'app-business-add-product',
  templateUrl: './business-add-product.component.html',
  styleUrls: ['./business-add-product.component.scss']
})
export class BusinessAddProductComponent implements OnInit {

  submitted = false;

  validity: FormGroup;


  public imagePath;
  imgURL: any;
  public message: string;
  Name = new FormControl('', [Validators.required ]);
  Tags = new FormControl('', [Validators.required ]);
  Price = new FormControl('', [Validators.required ]);
  Stock = new FormControl('', [Validators.required ]);
  CategoryControl = new FormControl('', [Validators.required]);
  Image= new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder, private itemService: ItemsService) { }


  getErrorMessage() {
    return this.Name.hasError('required') ? 'You must enter a Name' :
        this.Name.hasError('Tags') ? 'Not a valid Name' :
            '';
  }
  getErrorMessageTags() {
    return this.Tags.hasError('required') ? 'You must enter a Tags' :
        this.Tags.hasError('Tags') ? 'Not a valid Tags' :
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
    this.validity = this.formBuilder.group({
      Name: ['', Validators.required],
      Tags: ['', Validators.required],
      Price: ['', Validators.required],
      Stock: ['', Validators.required],
      CategoryControl: ['', Validators.required],
      Image: ['', Validators.required],
  });

  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.validity.invalid) {
        return ;
    }

    const item: Item = this.validity.value;
    
    item.type = "product";
    /* item.image = link; */

    // الطريقة القديمة لأضافة اوب 
    /* var newitem = {
      type: "product",
      price: this.validity.get("price").value
    }  */

    this.itemService.addItem(item);

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.validity.value))
}



  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
}
}
