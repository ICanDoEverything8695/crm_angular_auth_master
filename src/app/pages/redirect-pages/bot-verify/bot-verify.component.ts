import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatbotService } from '../../../core/services/chatbot.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'crm-bot-verify',
  templateUrl: './bot-verify.component.html',
  styleUrls: ['./bot-verify.component.scss']
})
export class BotVerifyComponent implements OnInit {

  statusMessage = 'Verifying chat bot user...';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private chatBotService: ChatbotService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getParams();
  }

  private getParams(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.token) {
        this.chatBotService.verifyBot(params.token).subscribe(res => {
          this.statusMessage = 'Thank you, now your email is verified.';
          this.sharedService.showSuccessMessage('Successfully verified your chat bot user.');
          this.router.navigate(['/']);
        }, err => {
          this.statusMessage  = err.json().msg;
          this.sharedService.showSuccessMessage(err.json().msg);
        });
      }
    });
  }

}
