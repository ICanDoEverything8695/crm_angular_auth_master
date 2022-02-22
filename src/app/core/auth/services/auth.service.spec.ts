import { TestBed, inject, fakeAsync, discardPeriodicTasks, async, tick } from '@angular/core/testing';
import { Headers, ResponseOptions, Response } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/Observable';

import { Auth } from '../../models/auth.model';
import { User } from '../../models/user.model';
import { AuthService } from './auth.service';
import { ApiRoutingHelperService } from '../../helpers/api-routing-helper.service';
import { HttpHelperService } from '../../helpers/http-helper.service';

class MockCookieService {
  get(storage) {return 'cookie-data';}
  remove(storage) {return '';}
  put(storage) {return true}
}

class MockLocalStorageService {
  get(storage) {return 'localstorage-data';}
  remove(storage) {return '';}
  set(storage) {return true;}
}

class MockHttpHelperService {
  post(url, user, pa1 = false, p2 = false, header?: Headers) {
    if (!header) {
      return Observable.of({success: true});
    } else {
      return Observable.of({header: 'appended'});
    }
  }
  put() {
    return Observable.of({success: true});
  }
  get(): Observable<Response> {
    let resOpt = new ResponseOptions({
      body: JSON.stringify({success: true})
    });
    let res: Response = new Response(resOpt);
    return Observable.of(res);
  }
  delete() {
    return Observable.of({success: true})
  };
}

class MockApiRoutingService {
  userAPIUrl() {return 'userApiPath'};
  authAPIUrl() {return 'authApiUrl'};
  userAuthAPIUrl() {return 'userAuthAPIUrl'};
  userVerifyAPIUrl() {return 'userVerifyAPIUrl'};
  forgotPassword() {return 'forgotPassword'};
  changePassword() {return 'changePassword'};
}

describe('AuthService', () => {
  let authService: AuthService;
  let http: HttpHelperService;
  let cookieService: CookieService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: LocalStorageService, useClass: MockLocalStorageService},
        {provide: CookieService, useClass: MockCookieService},
        {provide: HttpHelperService, useClass: MockHttpHelperService},
        {provide: ApiRoutingHelperService, useClass: MockApiRoutingService},
        AuthService
      ]
    });
  }));

  beforeEach(async(() => {
    authService = TestBed.get(AuthService);
    http = TestBed.get(HttpHelperService);
    cookieService = TestBed.get(CookieService);
  }));

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should check cookie and localstorage to check current user session if exists returns true', () => {
    expect(authService.isLoggedIn()).toEqual(true);
  });

  it('should check cookie and localstorage to check current user session if no returns false', () => {
    spyOn(cookieService, 'get').and.returnValue(null);
    expect(authService.isLoggedIn()).toEqual(false);
  });

  it('signup function should call api and map it.', fakeAsync(() => {
    let retVal = null;
    authService.signup(null).subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('login function should call api and map it with success true or false', fakeAsync(() => {
    let retVal = null;
    authService.login(new Auth()).subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('login function should call api and if remember me option is checked then add new key to header of request', fakeAsync(() => {
    let retVal = null;
    authService.login(new Auth(), true).subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('logout function should call api and map it with success true', fakeAsync(() => {
    let retVal = null;
    authService.logout().subscribe(res => {retVal = res});
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('resetPassword function should call api and return status', fakeAsync(() => {
    let retVal = null;
    authService.resetPassword('token', 'new password').subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('changePassword function should call api and return status', fakeAsync(() => {
    let retVal = null;
    authService.changePassword({customBody: 'aaa'}).subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('logout function should call api and map it with success false', fakeAsync(() => {
    let retVal = null;
    spyOn(http, 'delete').and.returnValue(Observable.throw('error'));
    authService.logout().subscribe(res => {retVal = res});
    expect(retVal).toEqual({success: false});
    discardPeriodicTasks();
  }));

  it('getUserInfo function should call api and return user info', fakeAsync(() => {
    let retVal = null;
    authService.getUserInfo('uid').subscribe(res => retVal = res);
    tick();
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getUserInfoByToken function should call api and return user info', fakeAsync(() => {
    let retVal = null;
    authService.getUserInfoByToken('token').subscribe(res => retVal = res);
    tick();
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('checkTokenSession function should call api and return current token', fakeAsync(() => {
    let retVal = null;
    authService.checkTokenSession().subscribe(res => retVal = res);
    tick();
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('updateUserInfo function should call api and update user info as well', fakeAsync(() => {
    let retVal = null;
    authService.updateUserInfo('uid', new User()).subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('sendForgetPasswordMail function should call api and return status', fakeAsync(() => {
    let retVal = null;
    authService.sendForgotPasswordMail('email').subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('verifyUser function should call api and if it success then return true', fakeAsync(() => {
    let retVal = null;
    authService.verifyUser('token').subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('verifyUser function should call api and if it fails then return false and error message', fakeAsync(() => {
    let retVal = null;
    spyOn(http, 'post').and.returnValue(Observable.throw({message: 'error'}));
    authService.verifyUser('token', 'aaa', 'bbb').subscribe(res => retVal = res);
    expect(retVal).toEqual({success: false, message: 'error'});
    discardPeriodicTasks();
  }));
});
