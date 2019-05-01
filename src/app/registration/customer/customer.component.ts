import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserCustomer } from 'src/app/user/usercustomer';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  favoriteSeason: string;
  seasons: string[] = ['Male', 'Female',];
  hide = true;

  customerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    location: new FormControl('', [Validators.required,]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,]),
    confiremPassword: new FormControl('', [Validators.required,]),
  })
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  getErrorMessageName() {
    return this.customerForm.controls['name'].hasError('required') ? 'Name is Required' : '';

  }
  getErrorMessageEmail() {
    return this.customerForm.controls['email'].hasError('required') ? 'Email Is Required' :
      this.customerForm.controls['email'].hasError('email') ? 'Please enter a valid email address' : '';
  }
  getErrorMessagePhone() {
    return this.customerForm.controls['phone'].hasError('required') ? 'Phone is Required' : '';
  }
  getErrorMessageLocation() {
    return this.customerForm.controls['location'].hasError('required') ? 'Location Discription is Required' : '';
  }
  getErrorMessagePassword() {
    return this.customerForm.controls['password'].hasError('required') ? 'Password is Required' : '';
  }
  clearAllField() {
    this.customerForm.reset();
  }

  onSubmit()
  {
    if(this.customerForm.controls['confirempassword'].value 
    != this.customerForm.controls['password'].value)
    {
      // this.passwordsNotMatch = true;
      return;
    }

    // this.passwordsNotMatch = false;

    let user = {} as UserCustomer;
    
    user.name = this.customerForm.controls['name'].value;
    user.email = this.customerForm.controls['email'].value;
    user.phoneNumber = `+97${this.customerForm.controls['phone'].value}`;
    // user.city = this.customerForm.controls['city'].value;
    user.locationDescription = this.customerForm.controls['location'].value; 
    user.type = "customer";

    // this.authService.register(user.email, this.customerForm.controls['password'].value);
    this.authService.register(user, this.customerForm.controls['password'].value);
  }


}
