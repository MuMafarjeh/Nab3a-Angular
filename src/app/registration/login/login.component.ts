import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
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
    // if(authService.isLoggedIn)
    // {
    //   this.authService.logout().then(function()
    //   {
    //     console.log("logged out")
    //   });
    //   this.router.navigateByUrl('/');
    // }
  }

  loginWithEmail()
  {
    this.authService.login("protoskullry@gmail.com", 'kaf12345');
  }

  ngOnInit() {
    // LOGIN
    

    // LOGOUT
    
  }

}
