import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../../environments/environment';

import { LayoutComponent } from './layout.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ApiRoutingHelperService } from '../../../core/helpers/api-routing-helper.service';
import { HttpHelperService } from '../../../core/helpers/http-helper.service';
import { LocalStorageModule } from 'angular-2-local-storage';
import { CookieModule } from 'ngx-cookie';
import {SharedService} from '../../../shared/services/shared.service';
import {DirectivesModule} from '../../../shared/directives/directives.module';
import {MatSnackBarModule} from '@angular/material';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        AuthService,
        ApiRoutingHelperService,
        HttpHelperService,
        SharedService
      ],
      imports: [
        NgIdleKeepaliveModule.forRoot(),
        LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
        CookieModule.forRoot(),
        HttpModule,
        RouterTestingModule,
        DirectivesModule,
        MatSnackBarModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
