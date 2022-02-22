import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { environment } from '../../../environments/environment';

import { ApprovalsComponent } from './approvals.component';
import { ApprovalService } from '../../core/services/approval.service';
import { HttpHelperService } from '../../core/helpers/http-helper.service';
import { ApiRoutingHelperService } from '../../core/helpers/api-routing-helper.service';
import { SharedService } from '../../shared/services/shared.service';
import { MatSnackBarModule } from '@angular/material';
import { LocalStorageModule } from 'angular-2-local-storage';
import { CookieModule } from 'ngx-cookie';

describe('ApprovalsComponent', () => {
  let component: ApprovalsComponent;
  let fixture: ComponentFixture<ApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ApprovalService,
        HttpHelperService,
        ApiRoutingHelperService,
        SharedService
      ],
      imports: [
        BrowserAnimationsModule,
        HttpModule,
        LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
        CookieModule.forRoot(),
        MatSnackBarModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
