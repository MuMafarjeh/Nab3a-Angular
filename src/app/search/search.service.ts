import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  private INVENTORY_ITEMS_INDEX = 'INVENTORY_ITEMS_INDEX'
  private STORES_INDEX = 'STORES_INDEX'
  private ALL_INDEX = 'ALL_INDEX'

  public get allSearchConfig(): any
  {
    return {
      ...environment.algolia,
      // indexNames: [this.INVENTORY_ITEMS_INDEX, this.STORES_INDEX],
      indexName: this.ALL_INDEX,
      searchFunction(helper) {
        console.log(helper)
        const query = helper.state.query;
        if(SearchService.cannotSearch(query))
          return;

        console.log(query);
        helper.search();
      }
    }
  }

  public static cannotSearch(query: string): boolean
  {
    return !query || query == "" || query.length <= 2;
  }
}
