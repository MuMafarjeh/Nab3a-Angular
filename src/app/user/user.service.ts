import { User } from './user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUsers()
  {
    return this.firestore.collection("user").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = {id, ... a.payload.doc.data() } as User;
        return data;
      }))
    );
  }
  

  createUser(user: User){
    return this.firestore.collection('user').add(user);
  }

  updateUser(user: User)
  {
    return this.firestore.doc('user/' + user.id).update(user);
  }

  deleteUser(user: User)
  {
    this.firestore.doc('user/' + user.id).delete();
  }
}
