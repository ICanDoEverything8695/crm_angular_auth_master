import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../shared/material/material.module';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/auth/services/auth.service';
import { SharedService } from '../../../shared/services/shared.service';
import { SharedMockService } from '../../../test_modules/_general-services';
import { AuthMockService } from '../../../test_modules/_http-services/auth.mock-service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authService: AuthMockService;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: AuthService, useClass: AuthMockService},
        {provide: SharedService, useClass: SharedMockService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('login form should be empty when loading', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const ud = fixture.debugElement.query(By.css('#username'));
    const pd = fixture.debugElement.query(By.css('#password'));
    const ed = fixture.debugElement.query(By.css('.text-danger'));
    expect(component.user.username).toEqual('');
    expect(component.user.password).toEqual('');
    expect(component.error.isError).toEqual(false);
    expect(component.error.message).toEqual('');
    expect(ud.nativeElement.value).toEqual('');
    expect(pd.nativeElement.value).toEqual('');
    expect(ed).toBeNull();
  });

  it('should check username and password when login button clicked', () => {
    component.ngOnInit();
    let form: any;
    component.login(form);
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('.form-control-feedback'));
    expect(error.nativeElement.innerHTML).toEqual('All fields are required.');
    component.user.username = 'nacy';
    component.login(form);
    fixture.detectChanges();
    expect(error.nativeElement.innerHTML).toEqual('All fields are required.');
  });

  describe('after validation check, try login api,', () => {
    let form = {form : {valid : true}};
    beforeEach(() => {
      component.ngOnInit();
      component.user.username = 'nacy';
      component.user.password = 'nacypassword';
    });

    it('then error message should be disappeared', async(() => {
      component.login(form);
      fixture.detectChanges();
      const ed = fixture.debugElement.query(By.css('.text-danger'));
      expect(ed).toBeNull();
    }));

    it('if login fails, error should be appeared', async(() => {
      component.user.username = 'nacy';
      component.user.password = 'wrongpassword';
      component.login(form);
      fixture.detectChanges();
      const ed = fixture.debugElement.query(By.css('.form-control-feedback'));
      expect(ed.nativeElement.innerHTML).toBe('The username/password couple is invalid.');
    }));
  });
});
