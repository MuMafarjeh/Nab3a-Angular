import { CartService } from './services/cart.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from './auth/auth.service';
import { LoadingControllerService } from './loading-controller.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Refreshable } from './services/refreshable';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'نبعة';
  doneLoading: boolean = false;
  doneLoadingSubscription: Subscription;

  constructor(private loading: LoadingControllerService, private authService: AuthService, 
    private router: Router, private titleService: Title, private cartService: CartService)
  {
    console.log("start");
    this.titleService.setTitle( this.title );
    this.loading.doneLoading.subscribe((done) => {
      this.doneLoading = done;
    });
  }

  //Get ahold of the current component
  private routedComponent: Refreshable;

  public setRoutedComponent(componentRef: Refreshable){
    this.routedComponent = componentRef;
  }

  ngOnDestroy() {
    this.doneLoadingSubscription.unsubscribe();
  }

}


