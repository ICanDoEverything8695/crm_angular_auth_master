import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../shared/material/material.module';

import { ResetPasswordComponent } from './reset-password.component';
import { AuthService } from '../../../core/auth/services/auth.service';
import { SharedService } from '../../../shared/services/shared.service';
import { AuthMockService } from '../../../test_modules/_http-services/auth.mock-service';
import { SharedMockService } from '../../../test_modules/_general-services';

class DummyComponent {}

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let form = {form: {valid: true}};
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
      imports: [
        FormsModule,
        MaterialModule,
        RouterTestingModule.withRoutes([
          {path: 'login', component: DummyComponent}
        ]),
        BrowserAnimationsModule,
      ],
      providers: [
        {provide: AuthService, useClass: AuthMockService},
        {provide: SharedService, useClass: SharedMockService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    component.password = 'new-password';
    component.confirm_passowrd = 'new-password';
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('inputed password should be matched', () => {
    component.password = 'new-password';
    component.confirm_passowrd = 'unmatched-password';
    component.reset(form);
    fixture.detectChanges();
    const errEl = fixture.debugElement.query(By.css('.form-control-feedback')).nativeElement;
    expect(errEl.innerHTML).toEqual('Password does not match.');
  });

  it('should call reset password api and get success message', () => {
    component.token = 'AD482J5FA';
    component.reset(form);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errEl = fixture.debugElement.query(By.css('.form-control-feedback'));
      expect(errEl).toBeNull();
    });
  });

  it('should throw error if token is invalid', async(() => {
    component.token = 'invalid-token';
    component.reset(form);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errEl = fixture.debugElement.query(By.css('.form-control-feedback'));
      expect(errEl.nativeElement.innerHTML).toEqual('Failed to find user by validation token.');
    });
  }));
});
