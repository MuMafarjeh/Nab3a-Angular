import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private firestore: AngularFirestore) { }

  public getInventoryLive()
  {
    return this.firestore.collection("inventory_item").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = {id, ... a.payload.doc.data()} as Item;
        return data;
      }))
    );
  }

  public getInventory(): Item[]
  {
    var items = [];
    this.firestore.collection("inventory_item").ref.get().then(function(querySnapshot)
    {
      querySnapshot.forEach(function(doc) {
        let item = doc.data() as Item;
        item.id = doc.id;
        items.push(item);
      });
    });
    return items;
  }

 public getCategory(): string[]
  {
    var categories = [];
    this.firestore.collection("category").ref.get().then(function(querySnapshot)
    {
      querySnapshot.forEach(function(doc) {
        categories.push(doc.data())
      });
    });
    return categories;
  }

  public async reserveDoc()
  {
    let value = await this.firestore.collection("inventory_item").add({});
    return value.id;
  }

  public addItem(item: Item)
  {
    return this.firestore.doc("inventory_item/" + item.id).set(item);
  }

  public updateItem(item: Item)
  {
    return this.firestore.doc("inventory_item/" + item.id).set(item);
  }

  public deleteItem(item: Item)
  {
    return this.firestore.doc("inventory_item/" + item.id).delete();
  }
}
