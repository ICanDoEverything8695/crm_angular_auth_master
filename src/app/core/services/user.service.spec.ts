import { TestBed, inject, fakeAsync, discardPeriodicTasks } from '@angular/core/testing';

import { MockHttpHelper } from './mock.services';
import { UserService } from './user.service';
import { HttpHelperService } from '../helpers/http-helper.service';
import { User } from '../models/user.model';

describe('UserService', () => {

  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {provide: HttpHelperService, useClass: MockHttpHelper}
      ]
    });
  });

  beforeEach(() => {
    userService = TestBed.get(UserService);
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('getUsers function should make valid http request', fakeAsync(() => {
    let ret = null;
    userService.getUsers().subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getUserRolesByOrganizationTypeId function should make valid http request', fakeAsync(() => {
    let ret = null;
    userService.getUserRolesByOrganizationTypeId('org_type_id').subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('createUser function should make valid http request, user of crm inc', fakeAsync(() => {
    let ret = null;
    let user = new User();
    user.organization_id = 1;
    userService.createUser(user).subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('createUser function should make valid http request, user of normal organizations', fakeAsync(() => {
    let ret = null;
    let user = new User();
    user.organization_id = 3;
    userService.createUser(user).subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('editUser function should make valid http request', fakeAsync(() => {
    let ret = null;
    userService.editUser(new User()).subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('deleteUser function should make valid http request', fakeAsync(() => {
    let ret = null;
    userService.deleteUser('user_id').subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('restoreUser function should make valid http request', fakeAsync(() => {
    let ret = null;
    userService.restoreUser('user_id').subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('resendVerifyCode function should make valid http request', fakeAsync(() => {
    let ret = null;
    userService.resendVerifyCode('email').subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));
});
