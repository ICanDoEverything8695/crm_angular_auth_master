import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

import { LocalStorageService } from 'angular-2-local-storage';
import { CookieService } from 'ngx-cookie';
import { ApiRoutingHelperService, HttpHelperService } from 'app/core/helpers';

import { Auth, SignupInfo, User } from 'app/core/models';

@Injectable()
export class AuthService {

  constructor(
    private apiRoutingHelper: ApiRoutingHelperService,
    private http: HttpHelperService,
    private localStorageService: LocalStorageService,
    private cookieService: CookieService,
  ) { }

  /***
   * check if authentication info is exists
   * @returns {boolean}
   */
  isLoggedIn(): boolean {
    if (this.cookieService.get(environment.cookie.storage)) {
      return !!this.localStorageService.get(environment.localStorage.token);
    } else {
      this.localStorageService.remove(environment.localStorage.token);
      return false;
    }
  }

  /***
   * register new user
   * @param user
   * @returns {Observable<any>}
   */
  signup(user: SignupInfo) {
    return this.http.post(this.apiRoutingHelper.userAPIUrl(), user);
  }

  /***
   * login with username and password
   * @param user
   * @param rememberMe
   * @returns {Observable<R>}
   */
  login(user: Auth, rememberMe = false) {
    const url = environment.baseAPIUrl + 'users/auth';
    if (rememberMe) {
      user['remember'] = true;
    }
    return this.http.post(url, user, false, false, null).map(x => {
      this.localStorageService.set(environment.localStorage.token, x.access_token);
      this.localStorageService.set(environment.localStorage.refresh_token, x.refresh_token);
      this.setCookie(rememberMe);
      return {success: true};
    });
  }

  /***
   * logout user
   * @returns {Observable<R>}
   */
  logout() {
    return this.http.delete(this.apiRoutingHelper.userAuthAPIUrl(), false, true, null, false).map(x => {
      this.localStorageService.remove(environment.localStorage.token);
      this.cookieService.remove(environment.cookie.storage);
      return {success: true};
    }).catch(err => {
      this.localStorageService.remove(environment.localStorage.token);
      this.cookieService.remove(environment.cookie.storage);
      return Observable.of({success: false});
    });
  }

  /***
   * get user info
   * @param uid
   * @returns {Observable<R>}
   */
  getUserInfo(uid: string) {
    return this.http.get(this.apiRoutingHelper.userAPIUrl() + uid, null, true, null).map(x => x.json())
  }

  updateUserInfo(uid: string, userInfo: User) {
    return this.http.put(this.apiRoutingHelper.userAPIUrl() + uid, userInfo, false, true, null)
      .map(x => x)
  }

  /***
   * verify user
   * @param token
   * @param oldPassword
   * @param newPassword
   * @returns {Observable<any | any>}
   */
  verifyUser(token, oldPassword = null, newPassword = null) {
    const body = {
      token: token,
      old_password: oldPassword,
      new_password: newPassword
    };
    return this.http.post(this.apiRoutingHelper.userVerifyAPIUrl(), body).map(x => {
      return {success: true}
    }).catch(err => {
      return Observable.of({success: false, message: err.message})
    })
  }

  /***
   * get user information from verify token
   * @param token
   * @returns {Observable<any>}
   */
  getUserInfoByToken(token) {
    return this.http.get(this.apiRoutingHelper.userVerifyAPIUrl() + '/' + token, null, false, null).map(x => x.json())
  }

  /***
   * check authentication session
   * @returns {Observable<any>}
   */
  checkTokenSession() {
    if (!this.localStorageService.get(environment.localStorage.token)) {
      return Observable.throw({message: 'localstorage is empty'});
    }
    const url = environment.baseAPIUrl + 'users/auth';
    return this.http.get(url, null, true, null)
      .map(x => x.json())
  }

  /***
   * send forgot password email
   * @param email
   * @returns {Observable<any>}
   */
  sendForgotPasswordMail(email) {
    const body = { email: email };
    return this.http.put(this.apiRoutingHelper.forgotPassword(), body, false, false, null)
  }

  /***
   * reset password with token
   * @param token
   * @param password
   * @returns {Observable<any>}
   */
  resetPassword(token, password) {
    const body = {
      token: token,
      plaintext_password: password
    };
    return this.http.post(this.apiRoutingHelper.forgotPassword(), body, false, false, null)
  }

  changePassword(body) {
    return this.http.post(this.apiRoutingHelper.changePassword(), body, false, true, null)
  }

  /***
   * set authentication cookie
   * @param rememberMe
   */
  private setCookie(rememberMe: boolean): void {
    if (rememberMe) {
      const now = new Date();
      const expireDate = now.setDate(now.getDate() + environment.cookie.life);
      this.cookieService.put(environment.cookie.storage, environment.cookie.value, {expires: new Date(expireDate).toUTCString()});
    } else {
      this.cookieService.put(environment.cookie.storage, environment.cookie.value);
    }
  }

}
