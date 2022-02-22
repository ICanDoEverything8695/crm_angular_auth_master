import { TestBed, inject, async, fakeAsync, discardPeriodicTasks, tick } from '@angular/core/testing';
import { Http, RequestOptions, URLSearchParams, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';
import { CookieService } from 'ngx-cookie';

import { HttpHelperService } from './http-helper.service';

class MockLocalStorageService {

  savedToken = 'expired-token';

  get(store: string) {
    return this.savedToken;
  }

  remove(str) {
    this.savedToken = '';
  }

  set(store: string, value: string) {
    this.savedToken = 'valid-token';
  }
}

class MockCookieService {
  remove(str) {
    return;
  }
}

class MockHttp {
  get(url, option: RequestOptions) {
    const authorizationHeader = option.headers.get('Authorization');
    if (authorizationHeader === 'Jwt ' + 'valid-token') {
      return Observable.of({success: true});
    } else if (authorizationHeader === 'Jwt ' + 'expired-token') {
      return Observable.throw({status: 401, message: 'Unauthorized'});
    } else {
      return Observable.throw({status: 500, message: 'Internal Server Error'});
    }
  }

  delete(url, option: RequestOptions) {
    const authorizationHeader = option.headers.get('Authorization');
    let resOpt = new ResponseOptions({
      body: JSON.stringify({success: true})
    });
    let res: Response = new Response(resOpt);
    if (authorizationHeader === 'Jwt ' + 'valid-token') {
      return Observable.of(res);
    } else if (authorizationHeader === 'Jwt ' + 'expired-token') {
      return Observable.throw({status: 401, message: 'Unauthorized'});
    } else if (!authorizationHeader) {
      return Observable.of(res);
    } else {
      return Observable.throw({status: 500, message: 'Internal Server Error'});
    }
  }

  post(url, body, option): Observable<Response> {
    const authorizationHeader = option.headers.get('Authorization');
    let resOpt = new ResponseOptions({
      body: JSON.stringify({success: true})
    });
    let res: Response = new Response(resOpt);
    if (authorizationHeader === 'Jwt ' + 'valid-token') {
      return Observable.of(res);
    } else if (authorizationHeader === 'Jwt ' + 'expired-token') {
      return Observable.throw({status: 401, message: 'Unauthorized'});
    } else if (!authorizationHeader) {
      return Observable.of(res);
    } else {
      return Observable.throw({status: 500, message: 'Internal Server Error'});
    }
  }

  put(url, body, option: RequestOptions) {
    const authorizationHeader = option.headers.get('Authorization');
    let resOpt = new ResponseOptions({
      body: JSON.stringify({success: true})
    });
    let res: Response = new Response(resOpt);

    if (authorizationHeader === 'Jwt ' + 'valid-token') {
      return Observable.of(res);
    } else if (authorizationHeader === 'Jwt ' + 'expired-token') {
      return Observable.throw({status: 401, message: 'Unauthorized'});
    } else if (!authorizationHeader) {
      return Observable.of(res);
    } else {
      return Observable.throw({status: 500, message: 'Internal Server Error'});
    }
  }

  patch(url, body, option: RequestOptions) {
    const authorizationHeader = option.headers.get('Authorization');
    let resOpt = new ResponseOptions({
      body: JSON.stringify({success: true})
    });
    let res: Response = new Response(resOpt);

    if (authorizationHeader === 'Jwt ' + 'valid-token') {
      return Observable.of(res);
    } else if (authorizationHeader === 'Jwt ' + 'expired-token') {
      return Observable.throw({status: 401, message: 'Unauthorized'});
    } else if (!authorizationHeader) {
      return Observable.of(res);
    } else {
      return Observable.throw({status: 500, message: 'Internal Server Error'});
    }
  }
}

describe('HttpHelperService', () => {

  let httpHelperService: HttpHelperService;
  let httpService: Http;
  let localStorageService: LocalStorageService;
  let reqOptions: RequestOptions;
  let headers: Headers;
  let search: URLSearchParams;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpHelperService,
        {provide: Http, useClass: MockHttp},
        {provide: LocalStorageService, useClass: MockLocalStorageService},
        {provide: CookieService, useClass: MockCookieService}
      ]
    });
  }));

  beforeEach(async(() => {
    httpHelperService = TestBed.get(HttpHelperService);
    httpService = TestBed.get(Http);
    localStorageService = TestBed.get(LocalStorageService);
    reqOptions = new RequestOptions();
    headers = new Headers({ 'Content-Type': 'application/json' });
    search = new URLSearchParams();
  }));

  it('should be created', inject([HttpHelperService], (service: HttpHelperService) => {
    expect(service).toBeTruthy();
  }));

  it('func:generateReqOptions() with empty suits', () => {
    reqOptions = new RequestOptions({headers, search});
    expect(JSON.stringify(httpHelperService['generateReqOptions']())).toBe(JSON.stringify(reqOptions));
  });

  it('func:generateReqOptions() with urlEncode param', () => {
    headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    reqOptions = new RequestOptions({headers, search});
    expect(JSON.stringify(httpHelperService['generateReqOptions'](true))).toBe(JSON.stringify(reqOptions));
  });

  it('func:generateReqOptions() with requireAuth param', () => {
    headers.append('Authorization', 'Jwt ' + 'expired-token');
    reqOptions = new RequestOptions({headers, search});
    expect(JSON.stringify(httpHelperService['generateReqOptions'](false, true))).toBe(JSON.stringify(reqOptions));
  });

  it('func:generateReqOptions() with customHeader param', () => {

    let customHeader = new Headers();

    customHeader.append('a', 'a');
    customHeader.append('b', 'b');
    customHeader.append('c', 'c');

    customHeader.forEach((value, key) => {
      headers.append(key, value[0]);
    });

    reqOptions = new RequestOptions({headers, search});
    expect(JSON.stringify(httpHelperService['generateReqOptions'](false, false, customHeader))).toBe(JSON.stringify(reqOptions));
  });

  it('func:generateReqOptions() with customParam param', () => {

    let customParam = {a: 'a', b: 'b', c: 'c'};
    for (const key in customParam) {
      search.set(key, customParam[key]);
    }

    reqOptions = new RequestOptions({headers, search});
    expect(httpHelperService['generateReqOptions'](false, false, null, customParam)).toEqual(reqOptions);
  });

  it('http get request should get valid response with no param(authentication not required case)', fakeAsync(() => {
    let retVal = null;
    spyOn(httpService, 'get').and.returnValue(Observable.of({success: true}));
    httpHelperService.get('url', {a: 'a'}).subscribe(res => {
      retVal = res;
    });
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('http get request should get valid response with authentication param(authentication required)', fakeAsync(() => {
    let retVal = null;
    spyOn(httpHelperService, 'refreshAccessToken').and.returnValue(Observable.of({success: true}));
    httpHelperService.get('url', {a: 'a'}, true).subscribe(res => {
      retVal = res;
    });
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('http post should get valid response without any param', fakeAsync(() => {
    let retVal = null;
    httpHelperService.post('url', {a: 'a'}).subscribe(res => {
      retVal = res;
    });
    tick();
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('http post should get valid response with params', fakeAsync(() => {
    let retVal = null;
    spyOn(httpHelperService, 'refreshAccessToken').and.returnValue(Observable.of({success: true}));
    httpHelperService.post('url', {a: 'a'}, true, true).subscribe(res => {
      retVal = res;
    });
    tick();
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('http put should get valid response without any param', fakeAsync(() => {
    let retVal = null;
    httpHelperService.put('url', {a: 'a'}).subscribe(res => {
      retVal = res;
    });
    tick();
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('http put should get valid response with params', fakeAsync(() => {
    let retVal = null;
    spyOn(httpHelperService, 'refreshAccessToken').and.returnValue(Observable.of({success: true}));
    httpHelperService.put('url', {a: 'a'}, true, true).subscribe(res => {
      retVal = res;
    });
    tick();
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('http put should handle errors as well', fakeAsync(() => {
    let retVal = null;
    spyOn(localStorageService, 'get').and.returnValue('invalid-token');
    httpHelperService.put('url', {a: 'a'}, true, true).subscribe(res => {
      retVal = res;
    }, err => retVal = err);
    tick();
    expect(retVal).toEqual({status: 500, message: 'Internal Server Error'});
    discardPeriodicTasks();
  }));

  it('http patch should get valid response without any param', fakeAsync(() => {
    let retVal = null;
    httpHelperService.patch('url', {a: 'a'}).subscribe(res => {
      retVal = res;
    });
    tick();
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('http patch should get valid response with params', fakeAsync(() => {
    let retVal = null;
    spyOn(httpHelperService, 'refreshAccessToken').and.returnValue(Observable.of({success: true}));
    httpHelperService.patch('url', {a: 'a'}, true, true).subscribe(res => {
      retVal = res;
    });
    tick();
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('http patch should handle errors as well', fakeAsync(() => {
    let retVal = null;
    spyOn(localStorageService, 'get').and.returnValue('invalid-token');
    httpHelperService.patch('url', {a: 'a'}, true, true).subscribe(res => {
      retVal = res;
    }, err => retVal = err);
    tick();
    expect(retVal).toEqual({status: 500, message: 'Internal Server Error'});
    discardPeriodicTasks();
  }));

  it('http delete request should get valid response with no param(authentication not required)', fakeAsync(() => {
    let retVal = null;

    spyOn(httpService, 'delete').and.returnValue(Observable.of(new Response(new ResponseOptions({
      body: JSON.stringify({success: true})
    }))));
    httpHelperService.delete('url').subscribe(res => {
      retVal = res;
    });
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('http delete request should get valid response with params', fakeAsync(() => {
    let retVal = null;
    spyOn(httpHelperService, 'refreshAccessToken').and.returnValue(Observable.of({success: true}));
    httpHelperService.delete('url', true, true).subscribe(res => {
      retVal = res;
    });
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('http delete request should get valid response when token check is false', fakeAsync(() => {
    let retVal = null;
    httpHelperService.delete('url', true, false, null, false).subscribe(res => {
      retVal = res;
    });
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('http delete request should handle errors as well', fakeAsync(() => {
    let retVal = null;
    spyOn(localStorageService, 'get').and.returnValue('invalid-token');
    httpHelperService.delete('url', true, true).subscribe(res => {
      retVal = res;
    }, err => retVal = err);
    expect(retVal).toEqual({status: 500, message: 'Internal Server Error'});
    discardPeriodicTasks();
  }));

  it('refreshAccessToken function should get valid response', fakeAsync(() => {
    let retVal = null;
    spyOn(localStorageService, 'get').and.returnValue('valid-token');
    httpHelperService.refreshAccessToken().subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));
});
