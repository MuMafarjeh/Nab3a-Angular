
import { Item } from './../../item/item';
import { Order } from './order';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private firestore: AngularFirestore) { }

    public getOrder(): Order[]
    {
      var orders = [];

      this.firestore.collection("order").ref.get().then(function(querySnapshot) {

        querySnapshot.forEach(function(doc) {
          
          var order = doc.data() as Order;
          order.id = doc.id;
          order.TGDate = doc.data().timeGenerated.toDate();
          order.TRDate = doc.data().timeReceiving.toDate();
          orders.push(order);

        });
      });
      return orders;
    }

    public getProducts(orders: Order): Item[]

    {

      var products = [];
      this.firestore.doc(`/order/${orders.id}`).collection('orderedProducts').ref.get().then(function(querySnapshot){
       querySnapshot.forEach(function(doc){
         let product = doc.data() as Item;
         products.push(product);
       });
      });
      return products;
    }

}
