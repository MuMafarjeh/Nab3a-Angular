import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Guard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) 
  {

  }

  
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>
  {
    const userType = this.authService.userType;

    if(!this.authService.isLoggedIn && userType === null)
    {
      this.router.navigate(['/']);
      return false;
    }

    if(userType == 'customer')
    {
      this.router.navigate(['home-page-customer']);
      return true;
    }

    if (userType == 'business')
    {
      this.router.navigate(['home-page-business']);
      return true;
    }

  }
}
