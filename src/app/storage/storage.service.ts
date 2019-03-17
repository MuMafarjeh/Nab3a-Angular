import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { storage } from 'firebase';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storageRef: AngularFireStorageReference;


  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) { }

  uploadImageProduct(path: File, productName: string)
  {
    this.storageRef = this.storage.ref("/item_images/");
    const task =  this.storage.upload("/item_images/" + productName , path);

    var downloadURL: Observable<string>;
    task.snapshotChanges().pipe(
      finalize(() =>
      {
        downloadURL = this.storageRef.getDownloadURL();
        downloadURL.subscribe((observer) =>
        {
          console.log(observer);
        });
      })
    )
    .subscribe();
  }
}
