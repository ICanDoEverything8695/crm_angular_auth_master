import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DatasourceComponent } from './datasource.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpModule} from '@angular/http';
import {LocalStorageModule} from 'angular-2-local-storage';
import {environment} from '../../../environments/environment';
import {CookieModule} from 'ngx-cookie';
import {MaterialModule} from '../../shared/material/material.module';
import {DatasourceService} from '../../core/services/datasource.service';
import {HttpHelperService} from '../../core/helpers/http-helper.service';
import {SharedService} from '../../shared/services/shared.service';
import {MatSnackBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('DatasourceComponent', () => {
  let component: DatasourceComponent;
  let fixture: ComponentFixture<DatasourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasourceComponent ],
      imports: [
        RouterTestingModule,
        HttpModule,
        FormsModule,
        LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
        CookieModule.forRoot(),
        MaterialModule,
        MatSnackBarModule,
        BrowserAnimationsModule
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
    fixture = TestBed.createComponent(DatasourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
