import { UserService } from '../user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  messageForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit()
  {
    this.submitted = true;

    if(this.messageForm.invalid)
    {
      return;
    }

    this.success = true;
  
    var user = {} as User;
    user.name = this.messageForm.get('name').value;
    user.email = this.messageForm.get('email').value;
    this.userService.createUser(user);
  }

}
