import {Observable} from 'rxjs/Observable';
import {purchaseCategories, totalPurchasesGraph, totalSum, vendors, verticals} from '../_db/graphql.db';

export class GraphqlMockService {
  getAllVerticals() {
    return Observable.of({buyers: verticals}).toPromise();
  }

  getVendors(filter) {
    return Observable.of({transactions: vendors}).toPromise();
  }

  getTotalPurchases(filter) {
    return Observable.of({transactions: [{totalSum: totalSum}]}).toPromise();
  }

  getTotalPurchasesGraphData(filter) {
    return Observable.of({transactions: [totalPurchasesGraph]}).toPromise();
  }

  getPurchaseCategories(filter) {
    return Observable.of({transactions: [purchaseCategories]}).toPromise();
  }
}
