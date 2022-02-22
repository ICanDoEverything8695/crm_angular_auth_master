import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { CookieService } from 'ngx-cookie';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from 'environments/environment';

@Injectable()
export class HttpHelperService {

  constructor(
    private http: Http,
    private localStorageService: LocalStorageService,
    private cookieService: CookieService
  ) { }

  /***
   * generate request options
   * @param isUrlEncoded
   * @param requiredAuth
   * @param customHeader
   * @param customParam
   * @returns {RequestOptions}
   */
  private generateReqOptions(isUrlEncoded = false, requiredAuth = false, customHeader?: Headers , customParam?: Object): RequestOptions {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const search = new URLSearchParams();

    if (isUrlEncoded) {
      headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    }

    if (requiredAuth) {
      const token = this.localStorageService.get(environment.localStorage.token);
      headers.append('Authorization', 'Jwt ' + token);
    }

    if (customHeader) {
      customHeader.forEach((value, key) => {
        headers.append(key, value[0]);
      });
    }

    if (customParam) {
      // tslint:disable-next-line:forin
      for (const key in customParam) {
        search.set(key, customParam[key]);
      }
    }

    return new RequestOptions({ headers, search });
  }

  /***
   * http get helper
   * @param url
   * @param query
   * @param requiredAuth
   * @param headers
   * @returns {Observable<Response>}
   */
  get(url: string, query: Object, requiredAuth = false, headers?: Headers): Observable<any> {
    return this.http.get(url, this.generateReqOptions(false, requiredAuth, headers, query))
      .map(x => x)
      .catch(initialError => {
        if (initialError && initialError.status === 401) {
          return this.refreshAccessToken().flatMap(res => {
            this.localStorageService.set(environment.localStorage.token, res.access_token);
            this.localStorageService.set(environment.localStorage.refresh_token, res.refresh_token);
            return this.get(url, query, requiredAuth, headers);
          });
        } else {
          return Observable.throw(initialError);
        }
      })
  }

  /***
   * http post helper
   * @param url
   * @param body
   * @param isUrlEncoded
   * @param requiredAuth
   * @param headers
   * @returns {Observable<R|T>}
   */
  post(url: string, body: any, isUrlEncoded = false, requiredAuth = false, headers?: Headers): Observable<any> {
    if (isUrlEncoded) {
      const urlSearchParams = new URLSearchParams();
      Object.keys(body).forEach(key => {
        urlSearchParams.append(key, body[key]);
      });
      body = urlSearchParams.toString();
    }
    return this.http.post(url, body, this.generateReqOptions(isUrlEncoded, requiredAuth, headers))
      .map(x => x.json())
      .catch(initialError => {
        if (initialError && initialError.status === 401) {
          return this.refreshAccessToken().flatMap(res => {
            this.localStorageService.set(environment.localStorage.token, res.access_token);
            this.localStorageService.set(environment.localStorage.refresh_token, res.refresh_token);
            return this.post(url, body, isUrlEncoded, requiredAuth, headers);
          });
        } else {
          return Observable.throw(initialError);
        }
      })
  }

  /***
   * http put helper
   * @param {string} url
   * @param body
   * @param {boolean} isUrlEncoded
   * @param {boolean} requiredAuth
   * @param {Headers} headers
   * @returns {Observable<any>}
   */
  put(url: string, body: any, isUrlEncoded = false, requiredAuth = false, headers?: Headers): Observable<any> {
    if (isUrlEncoded) {
      const urlSearchParams = new URLSearchParams();
      Object.keys(body).forEach(key => {
        urlSearchParams.append(key, body[key]);
      });
      body = urlSearchParams.toString();
    }
    return this.http.put(url, body, this.generateReqOptions(isUrlEncoded, requiredAuth, headers))
      .map(x => x.json())
      .catch(initialError => {
        if (initialError && initialError.status === 401) {
          return this.refreshAccessToken().flatMap(res => {
            this.localStorageService.set(environment.localStorage.token, res.access_token);
            this.localStorageService.set(environment.localStorage.refresh_token, res.refresh_token);
            return this.put(url, body, isUrlEncoded, requiredAuth, headers);
          });
        } else {
          return Observable.throw(initialError);
        }
      })
  }

  /***
   * http patch helper
   * @param {string} url
   * @param body
   * @param {boolean} isUrlEncoded
   * @param {boolean} requiredAuth
   * @param {Headers} headers
   * @returns {Observable<any>}
   */
  patch(url: string, body: any, isUrlEncoded = false, requiredAuth = false, headers?: Headers): Observable<any> {
    if (isUrlEncoded) {
      const urlSearchParams = new URLSearchParams();
      Object.keys(body).forEach(key => {
        urlSearchParams.append(key, body[key]);
      });
      body = urlSearchParams.toString();
    }
    return this.http.patch(url, body, this.generateReqOptions(isUrlEncoded, requiredAuth, headers))
      .map(x => x.json())
      .catch(initialError => {
        if (initialError && initialError.status === 401) {
          return this.refreshAccessToken().flatMap(res => {
            this.localStorageService.set(environment.localStorage.token, res.access_token);
            this.localStorageService.set(environment.localStorage.refresh_token, res.refresh_token);
            return this.patch(url, body, isUrlEncoded, requiredAuth, headers);
          });
        } else {
          return Observable.throw(initialError);
        }
      })
  }

  /***
   * http delete helper
   * @param url
   * @param isUrlEncoded
   * @param requiredAuth
   * @param headers
   * @returns {Observable<R|T>}
   */
  delete(url: string, isUrlEncoded = false, requiredAuth = false, headers?: Headers, tokenCheck = true): Observable<any> {
    return this.http.delete(url, this.generateReqOptions(isUrlEncoded, requiredAuth, headers))
      .map(x => x.json())
      .catch(initialError => {
        if (initialError && initialError.status === 401 && tokenCheck) {
          return this.refreshAccessToken().flatMap(res => {
            this.localStorageService.set(environment.localStorage.token, res.access_token);
            this.localStorageService.set(environment.localStorage.refresh_token, res.refresh_token);
            return this.delete(url, isUrlEncoded, requiredAuth, headers);
          });
        } else {
          return Observable.throw(initialError);
        }
      })
  }

 refreshAccessToken() {
    const url = environment.baseAPIUrl + 'users/auth';
    const token = 'Jwt ' + this.localStorageService.get(environment.localStorage.refresh_token);
    const headers = new Headers({'Authorization': token});
    const opt = new RequestOptions({headers});
    return this.http.put(url, null, opt).map(x => x.json());
  }
}
