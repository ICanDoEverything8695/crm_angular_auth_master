import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../../../../shared/material/material.module';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { CookieModule } from 'ngx-cookie';
import { environment } from '../../../../../environments/environment';

import { OrganizationTableComponent } from './organization-table.component';
import { HttpHelperService } from '../../../../core/helpers/http-helper.service';
import { OrganizationService } from '../../../../core/services/organization.service';

describe('OrganizationTableComponent', () => {
  let component: OrganizationTableComponent;
  let fixture: ComponentFixture<OrganizationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationTableComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MaterialModule,
        CookieModule.forRoot(),
        LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
        HttpModule
      ],
      providers: [
        HttpHelperService,
        OrganizationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
