import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../../shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { HttpModule } from '@angular/http';
import { CookieModule } from 'ngx-cookie';
import { LocalStorageModule } from 'angular-2-local-storage';
import { environment } from '../../../../../environments/environment';

import { CreateOrganizationModalComponent } from './create-organization-modal.component';
import { OrganizationService } from '../../../../core/services/organization.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { HttpHelperService } from '../../../../core/helpers/http-helper.service';

class MockDialogRef {}

describe('CreateOrganizationModalComponent', () => {
  let component: CreateOrganizationModalComponent;
  let fixture: ComponentFixture<CreateOrganizationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrganizationModalComponent ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        CookieModule.forRoot(),
        LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
      ],
      providers: [
        {provide: MatDialogRef, useClass: MockDialogRef},
        SharedService,
        OrganizationService,
        HttpHelperService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrganizationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
