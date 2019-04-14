import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingControllerService {

  public doneLoadingUserAuth = new Subject<boolean>();

  constructor() { 
    this.doneLoadingUserAuth.next(false);
  }
}
