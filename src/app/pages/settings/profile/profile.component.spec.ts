import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatSnackBarModule } from '@angular/material';
import { LocalStorageModule } from 'angular-2-local-storage';
import { CookieModule } from 'ngx-cookie';
import { environment } from '../../../../environments/environment';

import { ProfileComponent } from './profile.component';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ApiRoutingHelperService } from '../../../core/helpers/api-routing-helper.service';
import { HttpHelperService } from '../../../core/helpers/http-helper.service';
import { SharedService } from '../../../shared/services/shared.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        HttpModule,
        MatSnackBarModule,
        LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
        CookieModule.forRoot()
      ],
      providers: [
        AuthService,
        ApiRoutingHelperService,
        HttpHelperService,
        SharedService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
