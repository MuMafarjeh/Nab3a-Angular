import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BusinessGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) 
  {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>
  {
    const isVerified = this.authService.isVerified;
    console.log(isVerified)
    if(!isVerified)
      this.router.navigate(['page-not-found']);

    const userType = this.authService.userType;

    if(userType === null)
      this.router.navigate(['page-not-found']);

    if(userType == 'business')
      return true;
    else
      this.router.navigate(['page-not-found']);
  }
}