import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-delete-snackbar',
  templateUrl: './item-delete-snackbar.component.html',
  styleUrls: ['./item-delete-snackbar.component.scss']
})
export class ItemDeleteSnackbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  delete()
  {
    alert("deleted!");
  }

}
