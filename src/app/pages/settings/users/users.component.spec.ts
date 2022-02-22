import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { LocalStorageModule } from 'angular-2-local-storage';
import { CookieModule } from 'ngx-cookie';

import { MaterialModule } from '../../../shared/material/material.module';
import { UsersComponent } from './users.component';
import { UserService } from '../../../core/services/user.service';
import { SharedService } from '../../../shared/services/shared.service';
import { OrganizationService } from '../../../core/services/organization.service';
import {HttpHelperService} from '../../../core/helpers/http-helper.service';

class MockClass {}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      providers: [
        UserService,
        SharedService,
        OrganizationService,
        HttpHelperService
      ],
      imports: [
        FormsModule,
        HttpModule,
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
        CookieModule.forRoot()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
