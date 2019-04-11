import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { category} from '../customer-browse-items/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: AngularFirestore,private auth: AuthService) { }

  public getMyCategory(): category[] {
    var category = [];
    this.firestore.collection("category").get().toPromise().then(
      function (querySnapshot) {
        console.log(querySnapshot);
        querySnapshot.forEach(function (doc) {
          let cate = doc.data() as category;
          cate.id = doc.id;

          category.push(cate);
          console.log(doc.data());
      });
    });


    return category;
  }
}
