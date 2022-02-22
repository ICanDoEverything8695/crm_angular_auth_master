import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { MatSnackBarModule } from '@angular/material';
import { IntegrationsComponent } from './integrations.component';
import { environment } from '../../../../environments/environment';
import { LocalStorageModule } from 'angular-2-local-storage';
import { CookieModule } from 'ngx-cookie';

import { MaterialModule } from '../../../shared/material/material.module';
import { IntegrationService } from '../../../core/services/integration.service';
import { HttpHelperService } from '../../../core/helpers/http-helper.service';
import { OrganizationService } from '../../../core/services/organization.service';
import { SharedService } from '../../../shared/services/shared.service';

describe('IntegrationsComponent', () => {
  let component: IntegrationsComponent;
  let fixture: ComponentFixture<IntegrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        HttpModule,
        RouterTestingModule,
        MatSnackBarModule,
        LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
        CookieModule.forRoot()
      ],
      declarations: [ IntegrationsComponent ],
      providers: [
        IntegrationService,
        HttpHelperService,
        SharedService,
        OrganizationService
	    ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
