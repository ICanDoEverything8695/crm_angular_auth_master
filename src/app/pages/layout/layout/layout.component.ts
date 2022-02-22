import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { userRoles } from '../../../core/user_roles';
import { environment } from '../../../../environments/environment';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

import { SharedService } from '../../../shared/services/shared.service';
import { AuthService } from 'app/core/auth';

@Component({
  selector: 'crm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  myOrgId = 0;

  userRoles = userRoles;
  timedOut = false;

  idleShow = false;
  idleCountdown = 0;

  private ot$: Subscription = new Subscription();
  private op$: Subscription = new Subscription();
  private oide$: Subscription = new Subscription();
  private oids$: Subscription = new Subscription();
  private otow$: Subscription = new Subscription();

  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.startIdleLocker();
    this.myOrgId = this.sharedService.getCurrentUser().org_id;
  }

  ngOnDestroy() {
    this.ot$.unsubscribe();
    this.op$.unsubscribe();
    this.oide$.unsubscribe();
    this.oids$.unsubscribe();
    this.otow$.unsubscribe();
  }

  toggleSideNav(sidenav): void {
    if (sidenav.opened) {
      sidenav.close();
    } else {
      sidenav.open();
    }
  }

  onLoginSucceed(): void {
  }

  private startIdleLocker(): void {
    this.idle.setIdle(environment.idleTimer);
    this.idle.setTimeout(30);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.oide$ = this.idle.onIdleEnd.subscribe(() => {
      location.reload();
      this.idleShow = false;
    });
    this.oids$ = this.idle.onIdleStart.subscribe(() => {});

    this.ot$ = this.idle.onTimeout.subscribe(() => {
      this.logout();
      this.timedOut = true;
    });

    this.otow$ = this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleShow = true;
      this.idleCountdown = countdown;
    });

    // sets the ping interval to 15 seconds
    this.keepalive.interval(15);

    this.op$ = this.keepalive.onPing.subscribe(() => {});

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleShow = false;
    this.timedOut = false;
  }

  logout(): void {
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/login']);
    }, err => {
      this.router.navigate(['/login'])
    });
  }

}
