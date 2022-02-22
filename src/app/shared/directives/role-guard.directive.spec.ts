import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { RoleGuardDirective } from './role-guard.directive';
import { userRoles } from '../../core/user_roles';
import { SharedService } from '../services/shared.service';
import { MatSnackBarModule } from '@angular/material';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'directive-test-component',
  template: ''
})
class TestComponent {
  public userRole = [userRoles.SE];
}

class MockSharedService {
  user: User = new User();
  constructor() {
    this.user.user_role = 'crm_admin';
  }
  getCurrentUser(): User {
    return this.user;
  }
}

describe('RoleGuardDirective', () => {

  let sharedService: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, RoleGuardDirective],
      providers: [
        {provide: SharedService, useClass: MockSharedService}
      ],
      imports: [MatSnackBarModule]
    });

    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `
          <div>
            <li [crmRoleGuard]="userRole"><a>link-to-somewhere</a></li>   
          </div>`
      }
    });

    sharedService = TestBed.get(SharedService);
  });

  it('should be able to test role-guard-directive with test component', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      const directiveEl = fixture.debugElement.query(By.directive(RoleGuardDirective));
      expect(directiveEl).not.toBeNull();
    })
  }));

  it('should be able to get component property', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      const directiveEl = fixture.debugElement.query(By.directive(RoleGuardDirective));
      const component = fixture.componentInstance;
      expect(component.userRole).toEqual(['supplier_executive']);
    })
  }));

  it('should be able to get directive input value from component', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      const directiveEl = fixture.debugElement.query(By.directive(RoleGuardDirective));
      const directiveInstance = directiveEl.injector.get(RoleGuardDirective);
      fixture.detectChanges();
      expect (directiveInstance.crmRoleGuard).toEqual(['supplier_executive'])
    });
  }));

  it('should be removed a tag since role does not match with current user', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      const directiveEl = fixture.debugElement.query(By.directive(RoleGuardDirective));
      const directiveInstance = directiveEl.injector.get(RoleGuardDirective);
      fixture.detectChanges();
      expect(directiveEl.nativeElement.innerHTML).toBe('');
    })
  }));

  it('should be remains a tag since role matches with current user', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      const directiveEl = fixture.debugElement.query(By.directive(RoleGuardDirective));
      const directiveInstance = directiveEl.injector.get(RoleGuardDirective);
      // mock user data to return current user role as supplier_executive in order to test matching case
      const user = new User();
      user.user_role = 'supplier_executive';
      spyOn(sharedService, 'getCurrentUser').and.returnValue(user);
      fixture.detectChanges();
      expect(directiveEl.nativeElement.innerHTML).toBe(`<a>link-to-somewhere</a>`);
    });
  }));

});
