import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private firestore: AngularFirestore) { }

  public getInventory()
  {
    return this.firestore.collection("inventory_item").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = {id, ... a.payload.doc.data()} as Item;
        return data;
      }))
    );
  }

  public addItem(item: Item)
  {
    return this.firestore.collection("inventory_item").add(item);
  }
}
