import { AuthService } from './auth/auth.service';
import { LoadingControllerService } from './loading-controller.service';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Nab3a';
  doneLoading: boolean = false;

  constructor(private loading: LoadingControllerService, private authService: AuthService, private router: Router)
  {
    this.loading.doneLoadingUserAuth.subscribe((doneLoading) =>
    {
      console.log(doneLoading);
      this.doneLoading = doneLoading;
    })
  }
}


