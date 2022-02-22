import { TestBed, async } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

import { userRoles } from '../../user_roles';
import { User } from '../../models/user.model';
import { RoleGuard } from './role.guard';
import { SharedService } from '../../../shared/services/shared.service';

class MockSharedService {
  user: User = new User();
  constructor() {
    this.user.user_role = 'crm_admin';
  }
  getCurrentUser(): User {
    return this.user;
  }
}

describe('RoleGuard', () => {
  let router = {
    navigate: jasmine.createSpy('navigate')
  };

  let roleGuard: RoleGuard;
  let sharedService: SharedService;
  const activatedRouterSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: router},
        {provide: SharedService, useClass: MockSharedService},
        RoleGuard
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    sharedService = TestBed.get(SharedService);
    roleGuard = TestBed.get(RoleGuard);
    activatedRouterSnapshot.data = {roles: [userRoles.KA, userRoles.KS, userRoles.SE]};
  });

  it('should be created', () => {
    expect(roleGuard).toBeTruthy();
  });

  it('should touch navigation if user have right role',() => {
    expect(roleGuard.canActivate(activatedRouterSnapshot, null)).toBe(true);
  });

  it('should prevent to touch navigation if user role does not match', () => {
    const user: User = new User();
    user.user_role = userRoles.BB;
    spyOn(sharedService, 'getCurrentUser').and.returnValue(user);
    expect(roleGuard.canActivate(activatedRouterSnapshot, null)).toBe(false);
  });

});
