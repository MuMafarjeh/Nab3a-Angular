import { following } from './../following-customer-page/following';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {
  unfollow: AngularFirestoreDocument<following>;

  constructor(private firestore: AngularFirestore, private aut: AuthService) { }

  public getfollowingCoustmer(checkBy:string): following[] {
    var follows = [];
    this.firestore.collection("following").ref.where(checkBy, '==', this.aut.userID).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {

        var follow = doc.data() as following;
        follow.id = doc.id;
        follows.push(follow);
      });

    });
    return follows;

  }
  public addFollow(following: following) {
    this.firestore.collection('following').add(following);
  }

  public unFollow(follows: following) {
    this.unfollow = this.firestore.doc('following/' + follows.id);
    this.unfollow.delete();
    console.log(follows.id);
  }
}
