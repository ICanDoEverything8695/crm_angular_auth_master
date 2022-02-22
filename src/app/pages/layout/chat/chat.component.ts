import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, stagger, query } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { ChatbotService } from '../../../core/services/chatbot.service';
import { SharedService } from '../../../shared/services/shared.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'crm-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [
    trigger('flyIn', [
      state('void', style({transform: 'translateY(525px)', opacity: 0})),
      transition('void => *', [
        animate('0.4s 800ms ease-out', keyframes([
          style({opacity: 0, transform: 'translateY(525px)', offset: 0}),
          style({opacity: 1, transform: 'translateY(-65px)',  offset: 0.4}),
          style({opacity: 1, transform: 'translateY(25px)',     offset: 0.6}),
          style({opacity: 1, transform: 'translateY(-25px)',     offset: 0.8}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1}),
        ]))
      ]),
      transition('* => void', [
        animate('0.3s', keyframes([
          style({opacity: 1, transform: 'translateY(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateY(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateY(60px)',  offset: 1.0})
        ]))
      ])
    ]),
    trigger('sliderIn', [
      state('void', style({transform: 'translateX(-60px)', opacity: 0})),
      transition('void => *', [
        animate('0.4s 800ms ease-out', keyframes([
          style({opacity: 0, transform: 'translateX(-60px)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(60px)',  offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class ChatComponent implements OnInit {

  user: User = new User();
  iframeSrc = 'https://webchat.botframework.com/embed/SKAEL_DA_DEV?t=';
  safeSrc;
  showChatBox = false;

  constructor(
    private sharedService: SharedService,
    private chatbotService: ChatbotService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.chatbotService.getWebChatToken().subscribe(res => {
      this.user = this.sharedService.getCurrentUser();
      this.iframeSrc += `${res.token}&username=${this.user.username}&userid=${this.user.token}`;
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeSrc);
    });
  }

}
