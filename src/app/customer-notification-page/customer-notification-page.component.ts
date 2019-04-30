import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';
import { notificationsLog } from '../business-notifications/notificationsLog';

@Component({
  selector: 'app-customer-notification-page',
  templateUrl: './customer-notification-page.component.html',
  styleUrls: ['./customer-notification-page.component.scss']
})
export class CustomerNotificationPageComponent implements OnInit {

  notifications: notificationsLog[];

  constructor(private notifService: NotificationsService) {
  }

  ngOnInit() {
    this.getMyNotifications();
  }

  getMyNotifications() {
    this.notifications = this.notifService.getMyNotifications();
    
  }


}
