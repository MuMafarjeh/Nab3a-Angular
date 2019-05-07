import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  private defaultDuration = 3;

  openSnackbar(message: string)
  {
    this.snackbar.open(message, "close", {duration: this.defaultDuration * 1000});
  }
}
