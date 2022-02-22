import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { HttpModule } from '@angular/http';
import { MatSnackBarModule } from '@angular/material';
import { LocalStorageModule } from 'angular-2-local-storage';
import { CookieModule } from 'ngx-cookie';
import { environment } from '../../../../../environments/environment';

import { EditUserModalComponent } from './edit-user-modal.component';
import { UserService } from '../../../../core/services/user.service';
import { HttpHelperService } from '../../../../core/helpers/http-helper.service';
import {SharedService} from '../../../../shared/services/shared.service';

class MockDialogRef {}

describe('EditUserModalComponent', () => {
  let component: EditUserModalComponent;
  let fixture: ComponentFixture<EditUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        HttpModule,
        LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
        CookieModule.forRoot(),
        MatSnackBarModule
      ],
      providers: [
        HttpHelperService,
        UserService,
        SharedService,
        {provide: MatDialogRef, useClass: MockDialogRef},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
