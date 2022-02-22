/*********
 * This file contains MockServices for unit tests
 * Used for services only, isolated testing
 */

import { Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/* istanbul ignore next */
export class MockHttpHelper {
  get() {
    return Observable.of(new Response(new ResponseOptions({body: JSON.stringify({success: true})})));
  }

  post() {
    return Observable.of({success: true});
  }

  put() {
    return Observable.of({success: true});
  }

  patch() {
    return Observable.of({success: true});
  }

  delete() {
    return Observable.of({success: true});
  }
}
