import { TestBed, inject } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material';

import { SharedService } from './shared.service';
import { User } from '../../core/models/user.model';

describe('SharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedService],
      imports: [
        MatSnackBarModule
      ]
    });
  });

  it('should be created', inject([SharedService], (service: SharedService) => {
    expect(service).toBeTruthy();
  }));

  it('Func:setCurrentUser() should store user info', inject([SharedService], (service: SharedService) => {
    const user = {
      email: 'test@email.com',
      first_name: null,
      is_deleted: null,
      is_validated: true,
      last_name: null,
      org_id: 1,
      org_name: 'Skael Inc',
      public_id: '2d70e807-0d58-448a-9614-42db1caddfbe',
      user_role: 'crm_admin',
      username: 'test-user'
    };
    service.setCurrentUser(user as User);
    expect(service.getCurrentUser()).toEqual(user as User);
  }));

  it('Func:cleanObject() should delete invalid properties from object', inject([SharedService], (service: SharedService) => {
    const obj = {pro1: 'str', pro2: null, pro3: undefined, pro4: true, pro5: 5, pro6: '', pro7: 0, pro8: -1};
    service.cleanObject(obj);
    expect(Object.keys(obj).indexOf('pro2') + Object.keys(obj).indexOf('pro3')).toEqual(-2);
  }));

  it('Func:cleanObject() should not delete valid properties from object', inject([SharedService], (service: SharedService) => {
    const obj = {pro1: 'str', pro2: null, pro3: undefined, pro4: true, pro5: 5, pro6: '', pro7: 0, pro8: -1};
    service.cleanObject(obj);
    expect(Object.keys(obj).indexOf('pro4')).toBeGreaterThan(-1);
  }));

});
