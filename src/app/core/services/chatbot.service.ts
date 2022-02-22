import { Injectable } from '@angular/core';
import { HttpHelperService } from '../helpers/http-helper.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ChatbotService {

  constructor(
    private http: HttpHelperService
  ) { }

  verifyBot(token: string) {
    const url = environment.baseAPIUrl + 'bot/verify/' + token;
    return this.http.put(url, null, false, false)
      .map(x => x)
  }

  getWebChatToken() {
    const url = environment.baseAPIUrl + 'webchat/token';
    return this.http.get(url, null, true, null).map(x => x.json())
  }

}
