import { AuthService } from './auth/auth.service';
import { CartService } from './services/cart.service';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingControllerService {

  public doneLoading = new Subject<boolean>();

  private cartSubscription: Subscription;
  private userAuthSubscription: Subscription;

  constructor(private authService: AuthService, private cartService: CartService) { 
    this.cartService.doneLoadingCart.next(false);

    this.userAuthSubscription = this.authService.doneLoadingUserAuth.subscribe(async (done) => 
    {
      if(done)
      { 
        await this.cartService.getCartsForUser(this.authService.userID);
      }
      this.doneLoading.next(done);
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userAuthSubscription.unsubscribe();
  }
}
