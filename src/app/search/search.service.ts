import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { 
    this.getIsVerified = new Subject<boolean>();
  }

  private INVENTORY_ITEMS_INDEX = 'INVENTORY_ITEMS_INDEX'
  private STORES_INDEX = 'STORES_INDEX'
  private ALL_INDEX = 'ALL_INDEX'

  public getIsVerified;
  public static queryEmitter = new Subject<string>();

  public get allSearchConfig(): any
  {
    return {
      ...environment.algolia,
      indexName: this.ALL_INDEX,
      searchFunction(helper) {
        const query = helper.state.query;
        if(!SearchService.canSearch(query))
        {
          return;
        }
        helper.search();
      }
    }
  }

  public static canSearch(query: string): boolean
  {
    const can = (query && typeof query == 'string' && query !== "" && query.length > 2);
    return can;
  }
}
