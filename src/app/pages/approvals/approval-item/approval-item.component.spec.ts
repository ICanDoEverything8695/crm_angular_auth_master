import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../shared/material/material.module';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../../../environments/environment';

import { ApprovalItemComponent } from './approval-item.component';
import { ApprovalService } from '../../../core/services/approval.service';
import { HttpHelperService } from '../../../core/helpers/http-helper.service';
import { ApiRoutingHelperService } from '../../../core/helpers/api-routing-helper.service';
import { SharedService } from '../../../shared/services/shared.service';
import { LocalStorageModule } from 'angular-2-local-storage';
import { CookieModule } from 'ngx-cookie';
import {DatasourceService} from '../../../core/services/datasource.service';

class MatDialogRefMock {
}

describe('ApprovalItemComponent', () => {
  let component: ApprovalItemComponent;
  let fixture: ComponentFixture<ApprovalItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        ApprovalService,
        HttpHelperService,
        ApiRoutingHelperService,
        SharedService,
        DatasourceService
      ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
        HttpModule,
        CookieModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
