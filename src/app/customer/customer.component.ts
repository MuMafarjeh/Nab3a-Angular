import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  favoriteSeason: string;
  seasons: string[] = ['Male', 'Female',];
  hide = true;

  form : FormGroup = new FormGroup({
    
  })
  constructor() { }

  ngOnInit() {
  }
  name = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required,]);
  password = new FormControl('', [Validators.required,]);
  location = new FormControl('', [Validators.required,]);
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessageName(){
    return this.name.hasError('required') ? 'Name is Required' : '';
    
  }
  getErrorMessageEmail() {
    return this.email.hasError('required') ? 'Email Is Required' :
        this.email.hasError('email') ? 'Please enter a valid email address' : '';
  }
  getErrorMessagePhone(){
    return this.phone.hasError('required') ? 'Phone is Required' : '';
  }
  getErrorMessageLocation(){
    return this.location.hasError('required') ? 'Location Discription is Required' : '';
  }
  getErrorMessagePassword(){
    return this.password.hasError('required') ? 'Password is Required' : '';
  }
  clearAllFiled(){

  }

}
