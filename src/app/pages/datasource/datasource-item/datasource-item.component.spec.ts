import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceItemComponent } from './datasource-item.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../shared/material/material.module';
import {NgPipesModule} from 'ngx-pipes';
import {RouterTestingModule} from '@angular/router/testing';
import {DatasourceService} from '../../../core/services/datasource.service';
import {HttpHelperService} from '../../../core/helpers/http-helper.service';
import {HttpModule} from '@angular/http';
import {LocalStorageModule} from 'angular-2-local-storage';
import {CookieModule} from 'ngx-cookie';
import {environment} from '../../../../environments/environment';
import {Browser} from 'selenium-webdriver';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedService} from '../../../shared/services/shared.service';

describe('DatasourceItemComponent', () => {
  let component: DatasourceItemComponent;
  let fixture: ComponentFixture<DatasourceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasourceItemComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        NgPipesModule,
        RouterTestingModule,
        HttpModule,
        LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
        CookieModule.forRoot(),
      ],
      providers: [
        DatasourceService,
        HttpHelperService,
        SharedService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
