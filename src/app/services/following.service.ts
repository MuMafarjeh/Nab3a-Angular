import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { following } from '../following-customer-page/following';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {

  constructor(private firestore: AngularFirestore, private aut: AuthService) { }

  public getfollowingCoustmer(): following []{
    var follows = [];
    this.firestore.collection("following").ref.where('customerID','==', this.aut.userID).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {

        var follow = doc.data() as following;
        follow.id = doc.id;
        follows.push(follow);
      });

    });
    console.log(follows);
    return follows;

  }
}
