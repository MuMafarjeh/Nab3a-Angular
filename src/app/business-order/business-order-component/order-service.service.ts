
import { Item } from './../../item/item';
import { Order } from './order';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../auth/auth.service';
import { StringifyOptions } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private firestore: AngularFirestore,private auth: AuthService) { }
  
    // TODO - Muayed: get orders with type == 'order' only, because the type can be 'cart' too
    public getOrder(chackBy: string): Order[]
    {
      var orders = [];
      console.log(this.auth.userID);
      this.firestore.collection("order").ref.where(chackBy,"==",this.auth.userID).get().then(function(querySnapshot) {

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
