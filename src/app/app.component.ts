import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';

import { SharedService } from './shared/services';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isLoading = false;
  navigating = false;

  loading$: Subscription = new Subscription();
  routing$: Subscription = new Subscription();

  constructor(
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.routing$ = this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
    this.subscribeLoader();
  }

  ngOnDestroy() {
    this.routing$.unsubscribe();
    this.loading$.unsubscribe();
  }

  private subscribeLoader(): void {
    this.loading$ = this.sharedService.fsplObs$.subscribe((flag: boolean) => {
      this.isLoading = flag;
      this.cdr.detectChanges();
    });
  }

  private navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.navigating = true;
    }
    if (event instanceof NavigationEnd) {
      this.navigating = false;
    }
  }
}
