import { users } from '../_db/user.db';
import {Observable} from 'rxjs/Observable';
import {Auth} from '../../core/models/auth.model';
import {ResponseOptions} from '@angular/http';

export class AuthMockService {
  sendForgotPasswordMail(email) {
    const user = users.find(x => x.email === email);
    if (user) {
      return Observable.of({success: true, data: user});
    } else if (email === 'invalid@user.com') {
      return Observable.throw({status: 500, message: 'Internal Server Error'});
    } else {
      return Observable.throw({status: 404, message: 'Can not find user'});
    }
  }

  login(user: Auth, rememberMe = false) {
    const match = users.find(x => x.username === user.username && x.password === user.password);
    if (match) {
      return Observable.of({success: true, data: match});
    } else {
      return Observable.throw({status: 400, message: 'Can not find user'});
    }
  }

  resetPassword(token: string, password: string) {
    const match = users.find(x => x.token === token);
    if (match) {
      return Observable.of({success: true, data: match});
    } else {
      return Observable.throw({status: 404, message: 'Failed to find user by validation token.'});
    }
  }

  getUserInfoByToken(token: string) {
    const match = users.find(x => x.token === token);
    if (match) {
      return Observable.of(match);
    } else {
      return Observable.throw(new Response(new ResponseOptions({
        body: JSON.stringify({msg: 'Failed to find user by validation token.'})
      })));
    }
  }

  verifyUser(token: string, tempPassword: string, newPassword: string) {
    const match = users.find(x => x.token === token && x.password === tempPassword);
    if (match) {
      return Observable.of({success: true, res: match});
    } else {
      return Observable.of({success: false, message: 'failed'});
    }
  }
}
