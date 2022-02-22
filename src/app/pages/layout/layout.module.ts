import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChatbotService } from '../../core/services/chatbot.service';
import { DirectivesModule } from '../../shared/directives/directives.module';
import { MaterialModule } from 'app/shared/material/material.module';

import { LayoutComponent, NavbarComponent } from '.';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    DirectivesModule
  ],
  declarations: [
    LayoutComponent,
    NavbarComponent,
    ChatComponent
  ],
  providers: [
    ChatbotService
  ]
})
export class LayoutModule { }
