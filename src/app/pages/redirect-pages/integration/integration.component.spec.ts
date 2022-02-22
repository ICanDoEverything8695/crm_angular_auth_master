import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { environment } from '../../../../environments/environment';
import { LocalStorageModule } from 'angular-2-local-storage';
import { CookieModule } from 'ngx-cookie';

import { HttpHelperService } from '../../../core/helpers/http-helper.service';

import { IntegrationComponent } from './integration.component';
import { SharedService } from '../../../shared/services/shared.service';

class MockService {

}

describe('IntegrationComponent', () => {
  let component: IntegrationComponent;
  let fixture: ComponentFixture<IntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule,
        LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
        CookieModule.forRoot(),
        MatSnackBarModule
      ],
      declarations: [ IntegrationComponent ],
      providers: [
        HttpHelperService,
        SharedService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
