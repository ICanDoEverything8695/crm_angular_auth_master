import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../shared/material/material.module';

import { ForgotPasswordComponent } from './forgot-password.component';
import { AuthService } from '../../../core/auth/services/auth.service';
import { AuthMockService } from '../../../test_modules/_http-services/auth.mock-service';
import { SharedMockService } from '../../../test_modules/_general-services';
import { SharedService } from '../../../shared/services/shared.service';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let form = {form: {valid : true}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterTestingModule,
        MaterialModule
      ],
      providers: [
        {provide: AuthService, useClass: AuthMockService},
        {provide: SharedService, useClass: SharedMockService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('form should be empty when loading', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
    expect(emailInput.value).toEqual('');
  });

  it('after validate, if 404 response returns, should show not found message', async(() => {
    component.ngOnInit();
    component.email = 'unknown@user.com';
    component.sendMessage(form);
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('.form-control-feedback')).nativeElement;
    expect(error.innerHTML).toEqual('Sorry, email not found.');
  }));

  it('after validate, if unknown error happens, should show error message', async(() => {
    component.ngOnInit();
    component.email = 'invalid@user.com';
    component.sendMessage(form);
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('.form-control-feedback')).nativeElement;
    expect(error.innerHTML).toEqual('Sorry, something went wrong.');
  }));

  describe('after validate, form', () => {

    let beforeGroup = null;

    beforeEach(async(() => {
      component.ngOnInit();
      component.email = 'bill@lock.com';
      beforeGroup = fixture.debugElement.query(By.css('.email-submit--group'));
    }));

    it('should show email form', async(() => {
      fixture.detectChanges();
      expect(beforeGroup).toBeTruthy();
    }));

    it('should display success message', async(() => {
      component.sendMessage(form);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const sm = fixture.debugElement.query(By.css('h4'));
        expect(component.isSuccess).toEqual(true);
        expect(sm).toBeTruthy();
      });
    }));
  })
});
