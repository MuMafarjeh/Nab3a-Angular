import { Component, OnInit } from '@angular/core';
import { notificationsLog } from '../business-notifications/notificationsLog';
import { NotificationsService } from '../services/notifications.service';

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
