import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { By } from '@angular/platform-browser';


import { SignupComponent } from './signup.component';
import { AuthService } from '../../../core/auth/services/auth.service';
import { SharedService } from '../../../shared/services/shared.service';
import { AuthMockService } from '../../../test_modules/_http-services/auth.mock-service';
import { SharedMockService } from '../../../test_modules/_general-services';

class MockActivatedRoute {
  params$ = new Subject();
  params = this.params$.asObservable();

  navigateWithToken(token): void {
    this.params$.next({token: token});
  }
}

class DummyComponent {}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let activatedRoute: MockActivatedRoute;
  let form = {form: {valid: true}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([
          {path: 'login', component: DummyComponent}
        ]),
        BrowserAnimationsModule,
        MaterialModule
      ],
      providers: [
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
        {provide: AuthService, useClass: AuthMockService},
        {provide: SharedService, useClass: SharedMockService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    activatedRoute = TestBed.get(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display error if token is invalid', async(() => {
    activatedRoute.navigateWithToken('invalid-token');
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errEl = fixture.debugElement.query(By.css('.error-message'));
      expect(errEl).toBeTruthy();
      expect(errEl.nativeElement.innerHTML).toEqual('Failed to find user by validation token.');
    });
  }));

  describe('with valid token', () => {
    beforeEach(async(() => {
      activatedRoute.navigateWithToken('ASFOK3234');
      fixture.whenStable().then(() => {
        component.newRegistration.temporary_pass = 'kwellpassword';
        component.newRegistration.new_pass = 'new_password';
        component.newRegistration.confirm_pass = 'new_password';
        fixture.detectChanges();
      });
    }));

    it('should get valid username and email', async(() => {
      const errEl = fixture.debugElement.query(By.css('.error-message'));
      expect(errEl).toBeNull();
      expect(component.userInfo.username).toEqual('kwell');
      expect(component.userInfo.email).toEqual('kwell@lock.com');
    }));

    it('should check new password and confirm password validation', () => {
      component.newRegistration.confirm_pass = 'unmatch';
      component.signup(form);
      fixture.detectChanges();
      const errEl = fixture.debugElement.query(By.css('.form-control-feedback'));
      expect(errEl.nativeElement.innerHTML).toEqual('Password does not match.');
    });

    it('should display error if verify fails', async(() => {
      component.newRegistration.temporary_pass = 'invalid-temp-password';
      component.signup(form);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const errEl = fixture.debugElement.query(By.css('.form-control-feedback'));
        expect(errEl.nativeElement.innerHTML).toEqual('Sorry, Something went wrong. Please contact with customer support.');
      });
    }));

    it('should be redirected to login if verify success', async(() => {
      component.signup(form);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const errEl = fixture.debugElement.query(By.css('.form-control-feedback'));
        expect(errEl).toBeNull();
      });
    }));
  });
});
