import {TestBed, inject, fakeAsync, discardPeriodicTasks} from '@angular/core/testing';
import { MockHttpHelper } from './mock.services';
import { HttpHelperService } from '../helpers/http-helper.service';
import { ChatbotService } from './chatbot.service';

describe('ChatbotService', () => {

  let chatbotService: ChatbotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChatbotService,
        {provide: HttpHelperService, useClass: MockHttpHelper}
      ]
    });
  });

  beforeEach(() => {
    chatbotService = TestBed.get(ChatbotService);
  });

  it('should be created', inject([ChatbotService], (service: ChatbotService) => {
    expect(service).toBeTruthy();
  }));

  it('verifyBot function should get valid response', fakeAsync(() => {
    let retVal = null;
    chatbotService.verifyBot('valid-token').subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getWebChatToken function should get valid token', fakeAsync(() => {
    let retVal = null;
    chatbotService.getWebChatToken().subscribe(res => retVal = res);
    expect(retVal).toEqual({success: true});
  }));
});
