import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { notificationsLog } from "./notificationsLog";
import { NotificationsService } from '../services/notifications.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-business-notifications',
  templateUrl: './business-notifications.component.html',
  styleUrls: ['./business-notifications.component.scss']
})
export class BusinessNotificationsComponent implements OnInit {

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

