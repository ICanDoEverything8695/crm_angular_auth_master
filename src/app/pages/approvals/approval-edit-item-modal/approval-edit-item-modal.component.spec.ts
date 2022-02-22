import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../shared/material/material.module';
import { MatDialogRef, MatSnackBarModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { environment } from '../../../../environments/environment';

import { ApprovalEditItemModalComponent } from './approval-edit-item-modal.component';
import { ApprovalService } from '../../../core/services/approval.service';
import { HttpHelperService } from '../../../core/helpers/http-helper.service';
import { SharedService } from '../../../shared/services/shared.service';
import { LocalStorageModule } from 'angular-2-local-storage';
import { ApiRoutingHelperService } from '../../../core/helpers/api-routing-helper.service';
import { CookieModule } from 'ngx-cookie';

import { KeyTag } from '../../../core/models/approval.model';

class MatDialogRefMock {
}

class MockSharedService {
}

describe('ApprovalEditItemModalComponent', () => {
  let component: ApprovalEditItemModalComponent;
  let fixture: ComponentFixture<ApprovalEditItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalEditItemModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        HttpModule,
        MaterialModule,
        LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
        BrowserAnimationsModule,
        CookieModule.forRoot()
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: ApprovalService, useClass: MockSharedService },
        { provide: HttpHelperService, useClass: MockSharedService },
        { provide: ApiRoutingHelperService, useClass: MockSharedService },
        { provide: SharedService, useClass: MockSharedService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalEditItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
