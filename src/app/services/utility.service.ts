import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public firestore: AngularFirestore) { }

  public static removeExtraAttributesAlgolia(object: any)
  {
    delete object['_highlightResult'];
    delete object['objectID'];

    return object;
  }

  public static getServerTime(): Date
  {
    return new Date();
  }

}
