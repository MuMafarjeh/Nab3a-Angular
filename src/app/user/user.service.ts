import { UserDelivery } from './userdelivery';
import { UserCustomer } from './usercustomer';
import { User } from './user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UserBusiness } from './userbusiness';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUsers() {
    return this.firestore.collection("user").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = { id, ...a.payload.doc.data() } as User;
        return data;
      }))
    );
  }

  getUser(userID: string) {
    // return this.firestore.collection<User>("user", ref => ref.where('userID', '==', userID)).get();
    return this.firestore.doc<User>(`/user/${userID}`).get();
  }

  async getUser2(userID: string): Promise<UserBusiness | UserCustomer | UserDelivery | User> 
  {
    const userDoc = await this.firestore.doc<User>(`/user/${userID}`).get().toPromise();

    const data = userDoc.data();
    data.id = userDoc.id;

    if(data.type == 'business')
      return data as UserBusiness;
    else if(data.type == 'customer')
      return data as UserCustomer;
    else if(data.type == 'delivery')
      return data as UserDelivery;
    else 
      return data as User;
  }

  createUser(user: User) {
    return this.firestore.collection('user').add(user);
  }

  updateUser(user: User) {
    return this.firestore.doc('user/' + user.id).update(user);
  }

  deleteUser(user: User) {
    this.firestore.doc('user/' + user.id).delete();
  }
  async getUsersByCategory(categoryName) {
    var users = [];
    await this.firestore.collection("user").ref.where("categoryName", "==", categoryName).get().then(
      function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let user = doc.data() as User;
          user.id = doc.id;
          users.push(user);
        });
      });


    return users;
  }
}
