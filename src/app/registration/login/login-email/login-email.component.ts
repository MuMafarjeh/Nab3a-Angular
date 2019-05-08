import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss']
})
export class LoginEmailComponent implements OnInit {

  constructor(private authService: AuthService, private formBuilder: FormBuilder) 
  { 
    this.form = this.formBuilder.group({
      email: ['',  Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  state: string = '';
  error: any;

  form: FormGroup;
  submitted: boolean = false;

  async onSubmit()
  {
    this.submitted = true;

    if(this.form.invalid)
    {
      return;
    }

    this.error = await this.authService.login(this.form.controls.email.value, this.form.controls.password.value);
  }
 
}
