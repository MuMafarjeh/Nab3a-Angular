import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-delivery-man',
  templateUrl: './delivery-man.component.html',
  styleUrls: ['./delivery-man.component.scss']
})
export class DeliveryManComponent implements OnInit {

  deliveryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    location: new FormControl('', [Validators.required,]),
    city:new FormControl('', [Validators.required,]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,]),
    confiremPassword: new FormControl('', [Validators.required,]),
  })
  constructor() { }

  ngOnInit() {
  }
  getErrorMessageName() {
    return this.deliveryForm.controls['name'].hasError('required') ? 'Name is Required' : '';

  }
  getErrorMessageEmail() {
    return this.deliveryForm.controls['email'].hasError('required') ? 'Email Is Required' :
      this.deliveryForm.controls['email'].hasError('email') ? 'Please enter a valid email address' : '';
  }
  getErrorMessagePhone() {
    return this.deliveryForm.controls['phone'].hasError('required') ? 'Phone is Required' : '';
  }
  getErrorMessageLocation() {
    return this.deliveryForm.controls['location'].hasError('required') ? 'Location Discription is Required' : '';
  }
  getErrorMessageCity() {
    return this.deliveryForm.controls['city'].hasError('required') ? 'City Name is Required' : '';
  }
  getErrorMessagePassword() {
    return this.deliveryForm.controls['password'].hasError('required') ? 'Password is Required' : '';
  }
  clearAllField() {
    this.deliveryForm.reset();
  }
}
