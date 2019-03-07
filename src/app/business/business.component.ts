import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  name = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required,]);
  password = new FormControl('', [Validators.required,]);
  location = new FormControl('', [Validators.required,]);
  email = new FormControl('', [Validators.required, Validators.email]);
  city = new FormControl('', [Validators.required,]);

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
  getErrorMessageCity(){
    return this.city.hasError('required') ? 'City is Required' : '';
  }
}
