import {TestBed, async, fakeAsync, tick, discardPeriodicTasks} from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../../../shared/services/shared.service';

import { User } from '../../models/user.model';

class MockAuthService {
  user = {
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

  checkTokenSession() {
    return Observable.of(this.user as User);
  }
}

class MockSharedService {
  currentUser: User = new User();

  setCurrentUser(currentUser: User): void {
    this.currentUser = currentUser;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }
}

describe('AuthGuard', () => {

  let fixture;
  let router = {navigate: jasmine.createSpy('navigate')};
  let authService: AuthService;
  let sharedService: SharedService;
  let authGuard: AuthGuard;
  let retValue = false;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: router},
        {provide: AuthService, useClass: MockAuthService},
        {provide: SharedService, useClass: MockSharedService},
        AuthGuard,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    authGuard = TestBed.get(AuthGuard);
    authService = TestBed.get(AuthService);
    sharedService = TestBed.get(SharedService);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should check current session, if valid save it to service', fakeAsync(() => {
    authGuard.canActivate(null, null).subscribe(res => {
      retValue = res;
    });
    tick();
    expect(sharedService.getCurrentUser().username).toBe('test-user');
    discardPeriodicTasks();
  }));

  it('should check current session, if valid touch router', fakeAsync(() => {
    authGuard.canActivate(null, null).subscribe(res => {
      retValue = res;
    });
    tick();
    expect(retValue).toBe(true);
    discardPeriodicTasks();
  }));

  it('should prevent to touch navigation if current session is not valid', fakeAsync(() => {
    retValue = true;
    spyOn(authService, 'checkTokenSession').and.returnValue(Observable.throw({success: false, error: 'custom'}));
    authGuard.canActivate(null, null).subscribe(res => {
      retValue = res;
    });
    tick();
    expect(retValue).toBe(false);
    discardPeriodicTasks();
  }));
});
