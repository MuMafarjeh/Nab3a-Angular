import { UserService } from './../../user/user.service';
import { User } from 'firebase';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { matchesElement } from '@angular/animations/browser/src/render/shared';
import { UserBusiness } from './../../user/userbusiness';

@Component({
  selector: 'business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  passwordsNotMatch: boolean = false;

  constructor(private authService: AuthService, private userService: UserService) { 
    
  }

  ngOnInit() {
  }

  businessForm: FormGroup = new FormGroup({
    Pname: new FormControl('', [Validators.required]),
    Oname: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10,10}")]),
    location: new FormControl('', [Validators.required,]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,]),
    confirempassword: new FormControl('', [Validators.required,]),
  });

  getErrorMessagePName() {
    return this.businessForm.controls['Pname'].hasError('required') ? 'Name is Required' : '';
  }
  getErrorMessageOName() {
    return this.businessForm.controls['Oname'].hasError('required') ? 'Name is Required' : '';
  }
  getErrorMessageEmail() {
    return this.businessForm.controls['email'].hasError('required') ? 'Email Is Required' :
      this.businessForm.controls['email'].hasError('email') ? 'Please enter a valid email address' : '';
  }
  getErrorMessagePhone() {
    return this.businessForm.controls['phone'].hasError('required') ? 'Phone Is Required' :
      this.businessForm.controls['phone'].errors.pattern ? 'Please enter a valid Phone Number (eg:0595480705)' : '';
  }
  getErrorMessageLocation() {
    return this.businessForm.controls['location'].hasError('required') ? 'Location Discription is Required' : '';
  }
  getErrorMessagePassword() {
    return this.businessForm.controls['password'].hasError('required') ? 'Password is Required' : '';
  }
  getErrorMessageConPassword() {
    return this.businessForm.controls['confirempassword'].hasError('required') ? 'Password is Required' :
      (this.businessForm.controls['confirempassword'].value != this.businessForm.controls['password'].value) ? 'Passwords dont Match' : '';
  }
  getErrorMessageCity() {
    return this.businessForm.controls['city'].hasError('required') ? 'City is Required' : '';
  }
  clearAllField(){
    this.businessForm.reset();
  }

  submitForm()
  {
    if(this.businessForm.controls['confirempassword'].value 
      != this.businessForm.controls['password'].value)
      {
        this.passwordsNotMatch = true;
        return;
      }

      this.passwordsNotMatch = false;

    let user = {} as UserBusiness;
    
    user.name = this.businessForm.controls['Pname'].value;
    user.ownerName = this.businessForm.controls['Oname'].value;
    user.email = this.businessForm.controls['email'].value;
    user.phoneNumber = `+97${this.businessForm.controls['phone'].value}`;
    user.city = this.businessForm.controls['city'].value;
    user.locationDescription = this.businessForm.controls['location'].value; 
    user.type = "business";
  
    this.authService.register(user.email, this.businessForm.controls['password'].value);
    // this.authService.register(user, this.businessForm.controls['password'].value);
  }
}
