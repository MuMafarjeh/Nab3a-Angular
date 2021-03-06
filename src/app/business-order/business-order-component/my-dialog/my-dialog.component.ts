import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Item } from 'src/app/item/item';
import { OrderServiceService } from '../order-service.service';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.scss']
})
export class MyDialogComponent implements OnInit {

  constructor( public MatDialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private orderService: OrderServiceService) {
      this.items=data;
    }

    @Input()
    items:Item[];

  ngOnInit() {

  }

}
