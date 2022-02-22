import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../shared/material/material.module';

import { ChatComponent } from './chat.component';
import {SharedService} from '../../../shared/services/shared.service';
import {ChatbotService} from '../../../core/services/chatbot.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../core/models/user.model';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

class MockSharedService {
  getCurrentUser() {
    return new User();
  }
}

class MockChatbotService {
  getWebChatToken() {
    return Observable.of({token: 'valid'});
  }
}

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule
      ],
      providers: [
        {provide: SharedService, useClass: MockSharedService},
        {provide: ChatbotService, useClass: MockChatbotService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
