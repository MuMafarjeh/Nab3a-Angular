import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  public static removeExtraAttributesAlgolia(object: any)
  {
    delete object['_highlightResult'];
    delete object['objectID'];  

    return object;
  }
  
}
