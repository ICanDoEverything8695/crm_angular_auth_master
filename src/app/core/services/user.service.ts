import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHelperService } from '../helpers/http-helper.service';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  constructor(
    private http: HttpHelperService
  ) { }

  getUsers() {
    const url = environment.baseAPIUrl + 'users/';
    return this.http.get(url, null, true, null).map(x => x.json());
  }

  getUserRolesByOrganizationTypeId(org_type_id) {
    const url = environment.baseAPIUrl + 'users/roles/' + org_type_id;
    return this.http.get(url, null, true, null).map(x => x.json());
  }

  createUser(user: User) {
    const url = environment.baseAPIUrl + 'users/';
    if (user.organization_id === 1) {
      delete user.organization_id;  // remove organization id if this is crm_inc
    }
    return this.http.post(url, user, false, true).map(x => x);
  }

  editUser(user: User) {
    const url = environment.baseAPIUrl + 'users/' + user.public_id;
    const body = {
      first_name: user.first_name, last_name: user.last_name, email: user.email
    };
    return this.http.put(url, body,  false, true).map(x => x);
  }

  deleteUser(id: string) {
    const url = environment.baseAPIUrl + 'users/' + id;
    return this.http.delete(url, false, true, null).map(x => x);
  }

  restoreUser(id: string) {
    const url = environment.baseAPIUrl + 'users/' + id;
    return this.http.patch(url, null, false, true, null).map(x => x);

  }

  resendVerifyCode(email: string) {
    const url = environment.baseAPIUrl + 'users/verify';
    const body = {email: email};
    return this.http.put(url, body, false, true, null).map(x => x);
  }
}
