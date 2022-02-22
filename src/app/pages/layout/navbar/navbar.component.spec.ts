import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { CookieModule } from 'ngx-cookie';

import { AuthService } from 'app/core/auth';
import { ApiRoutingHelperService } from 'app/core/helpers/api-routing-helper.service';
import { HttpHelperService } from 'app/core/helpers/http-helper.service';
import { SharedService } from '../../../shared/services/shared.service';
import { MaterialModule } from '../../../shared/material/material.module';
import { RoleGuardDirective } from '../../../shared/directives/role-guard.directive';

import { NavbarComponent } from './navbar.component';

let RouterEvents = {
  subscribe: jasmine.createSpy('subscribe'),
  unsubscribe: jasmine.createSpy('unsubscribe')
}

let MockRouter = {
  navigate: jasmine.createSpy('navigate'),
  events: RouterEvents
}

let MockStorageService = {
  get: jasmine.createSpy('get')
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpModule,
        CookieModule.forRoot()
      ],
      declarations: [ NavbarComponent, RoleGuardDirective ],
      providers: [
        AuthService, ApiRoutingHelperService, SharedService, HttpHelperService,
        { provide: Router, useValue: MockRouter },
        { provide: LocalStorageService, useValue: MockStorageService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
