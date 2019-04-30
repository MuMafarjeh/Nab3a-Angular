import { Title } from '@angular/platform-browser';
import { AuthService } from './auth/auth.service';
import { LoadingControllerService } from './loading-controller.service';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Refreshable } from './services/refreshable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'نبعة';
  doneLoading: boolean = false;

  constructor(private loading: LoadingControllerService, private authService: AuthService, 
    private router: Router, private titleService: Title)
  {
    this.titleService.setTitle( this.title );
    this.loading.doneLoadingUserAuth.subscribe((doneLoading) =>
    {
      this.doneLoading = doneLoading;
    })
  }

  //Get ahold of the current component
  private routedComponent: Refreshable;

  public setRoutedComponent(componentRef: Refreshable){
    this.routedComponent = componentRef;
  }

}


