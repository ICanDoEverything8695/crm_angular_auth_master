import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotVerifyComponent } from './bot-verify.component';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';
import {LocalStorageModule} from 'angular-2-local-storage';
import {environment} from '../../../../environments/environment';
import {CookieModule} from 'ngx-cookie';
import {MatSnackBarModule} from '@angular/material';
import {HttpHelperService} from '../../../core/helpers/http-helper.service';
import {SharedService} from '../../../shared/services/shared.service';
import {ChatbotService} from '../../../core/services/chatbot.service';

class MockService {

}

describe('BotVerifyComponent', () => {
  let component: BotVerifyComponent;
  let fixture: ComponentFixture<BotVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotVerifyComponent ],
      imports: [
        HttpModule,
        RouterTestingModule,
        LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
        CookieModule.forRoot(),
        MatSnackBarModule
      ],
      providers: [
        HttpHelperService,
        SharedService,
        ChatbotService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
