import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material/material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatSnackBarModule } from '@angular/material';
import { environment } from '../../../../environments/environment';

import { OrganizationComponent } from './organization.component';
import { OrganizationService } from '../../../core/services/organization.service';
import { HttpHelperService } from '../../../core/helpers/http-helper.service';
import { LocalStorageModule } from 'angular-2-local-storage';
import { CookieModule } from 'ngx-cookie';
import { SharedService } from '../../../shared/services/shared.service';

describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        MaterialModule,
        HttpModule,
        LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
        CookieModule.forRoot(),
        MatSnackBarModule
      ],
      providers: [
        OrganizationService,
        HttpHelperService,
        SharedService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
