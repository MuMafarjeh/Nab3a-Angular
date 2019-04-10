import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: any;

  constructor(private authService: AuthService, private router: Router) 
  { 
    
  } 

  ngOnInit() {
    
  }

}
