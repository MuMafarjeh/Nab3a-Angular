import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { storage } from 'firebase';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from '../item/item';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storageRef: AngularFireStorageReference;


  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) { }

  uploadImageProduct(path: File, item: Item)
  {
    this.storageRef = this.storage.ref("/item_images/" + item.id + "_" + item.name);
    const task =  this.storage.upload("/item_images/" + item.id + "_" + item.name , path);
    
    let observable = task.snapshotChanges();
    return { observable: observable, 
            storageRef: this.storageRef };
  }
}
