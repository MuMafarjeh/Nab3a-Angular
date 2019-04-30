import { BusinessGuard } from './../auth/business-guard.service';
import { AuthService } from './../auth/auth.service';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private firestore: AngularFirestore, private authService: AuthService,
    private businessGuard: BusinessGuard) { }

  public getInventoryLive() {
    return this.firestore.collection("inventory_item").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = { id, ...a.payload.doc.data() } as Item;
        return data;
      }))
    );
  }

  public async getInventory(): Promise<Item[]> {
    if (this.businessGuard.canActivate)
      var items = [];
    this.firestore.collection("inventory_item").ref.where('businessID', '==', this.authService.userID).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let item = doc.data() as Item;
        item.id = doc.id;
        items.push(item);
      });
    });
    return items;
  }

  public getCategory(): string[] {
    var categories = [];
    this.firestore.collection("category").ref.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        categories.push(doc.data())
      });
    });
    return categories;
  }

  public async reserveDoc() {
    let value = await this.firestore.collection("inventory_item").add({});
    return value.id;
  }

  public addItem(item: Item) {
    return this.firestore.doc("inventory_item/" + item.id).set(item);
  }

  public updateItem(item: Item) {
    return this.firestore.doc("inventory_item/" + item.id).set(item);
  }

  public deleteItem(item: Item) {
    return this.firestore.doc("inventory_item/" + item.id).delete();
  }

  public async getInventoryItem(itemID: String): Promise<Item>
  {
    const doc = await this.firestore.doc("inventory_item/" + itemID).get().toPromise()
    const item = doc.data() as Item;
    item.id = doc.id;

    return item;
  }
  public async getProductsByCategory(categoryName) {
    var items = [];
    await this.firestore.collection("inventory_item").ref.where("category", "==", categoryName).get().then(
      function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let item = doc.data() as Item;
          item.id = doc.id;
          items.push(item);
        });
      });
    return items;
  }

}
