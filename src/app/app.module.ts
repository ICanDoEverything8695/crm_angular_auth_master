import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
// environment
import { environment } from 'environments/environment';
// npm libraries
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { LocalStorageModule } from 'angular-2-local-storage';
import { CookieModule } from 'ngx-cookie';
import { AgmCoreModule } from '@agm/core';
// routing module
import { AppRoutingModule } from './app.routing'
// outer modules
import { MaterialModule } from './shared/material/material.module';
import { AuthModule } from './pages/auth/auth.module'
import { LayoutModule } from './pages/layout/layout.module';
// root components.
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { IntegrationComponent } from './pages/redirect-pages/integration/integration.component';
import { BotVerifyComponent } from './pages/redirect-pages/bot-verify/bot-verify.component';
// services
import { HttpHelperService, ApiRoutingHelperService } from './core/helpers'
import { AuthService, AuthGuard, RoleGuard } from './core/auth';
import { ChatbotService } from './core/services/chatbot.service';
import { SharedService } from './shared/services';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    IntegrationComponent,
    BotVerifyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    CookieModule.forRoot(),
    LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
    NgIdleKeepaliveModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: environment.googleMapAPIKey}),
    MomentModule,
    MaterialModule,
    AppRoutingModule,
    AuthModule,
    LayoutModule
  ],
  providers: [
    HttpHelperService,
    ApiRoutingHelperService,
    AuthService,
    ChatbotService,
    AuthGuard,
    RoleGuard,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
