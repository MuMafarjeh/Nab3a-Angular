import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { notificationsLog } from '../business-notifications/notificationsLog';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  
  constructor(private firestore: AngularFirestore,private auth: AuthService) { }

  public getMyNotifications(): notificationsLog[]{
    var notifications = [];
    console.log(`${this.auth.userData}`);
    this.firestore.collection("notificationLog").ref.where("toID","==", `aepPjKLaiSVwoyCKbEluLCroZzw2`).get().then(
      function (querySnapshot) {
        console.log(querySnapshot);
        querySnapshot.forEach(function (doc) {
          notifications.push(doc.data() as notificationsLog);
          console.log(doc.data());
      });
    });

    return notifications;
  }

}
