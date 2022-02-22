import { TestBed, async, fakeAsync, discardPeriodicTasks, tick, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AppComponent } from './app.component';

import { SharedService } from './shared/services/shared.service';
import { MaterialModule } from './shared/material/material.module';
import { MatProgressBar } from '@angular/material';

class MockRouter {
  navigationEnd = new NavigationEnd(0, 'http://testDomain.com/segment', 'http://testDomain.com/segmet');
  navigationStart = new NavigationStart(0, 'http://testDomain.com/segment');

  routing$ = new Subject();
  events = this.routing$.asObservable();

  navigate() {
    this.routing$.next(this.navigationStart);
    this.routing$.next(this.navigationEnd);
  }
}

class MockSharedService {
  fsplObs = new Subject();
  fsplObs$ = this.fsplObs.asObservable();

  startLoading() {
    this.fsplObs.next(true);
  }

  endLoading() {
    this.fsplObs.next(false);
  }
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let comp;
  let router: MockRouter;
  let sharedService: MockSharedService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: Router, useClass: MockRouter},
        {provide: SharedService, useClass: MockSharedService}
      ],
      imports: [
        RouterTestingModule,
        MaterialModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.debugElement.componentInstance;
      router = TestBed.get(Router);
      sharedService = TestBed.get(SharedService);
    });
  }));

  it('should create the app component', async(() => {
    fixture.whenStable().then(() => {
      expect(comp).toBeTruthy();
    });
  }));

  it('should show routing progress bar when routing begin', async(() => {
    comp.ngOnInit();
    spyOn(router, 'navigate').and.callFake(() => {
      router.routing$.next(new NavigationStart(0, 'http://testDomain.com/segment'));
    });
    router.navigate();
    fixture.detectChanges();
    const pd = fixture.debugElement.query(By.directive(MatProgressBar));
    comp.ngOnDestroy();
    expect(pd).toBeTruthy();
  }));

  it('should hide routing progress bar when routing finished', async(() => {
    comp.ngOnInit();
    router.navigate();
    fixture.detectChanges();
    const pd = fixture.debugElement.query(By.directive(MatProgressBar));
    comp.ngOnDestroy();
    expect(pd).toBeNull();
  }));

  it('should show loading spinner when loading start', async(() => {
    comp.ngOnInit();
    sharedService.startLoading();
    fixture.detectChanges();
    const ld = fixture.debugElement.query(By.css('.content-loading-ripple'));
    comp.ngOnDestroy();
    expect(ld).toBeTruthy();
  }));

  it('should hide loading spinner when loading finish', async(() => {
    comp.ngOnInit();
    sharedService.endLoading();
    fixture.detectChanges();
    const ld = fixture.debugElement.query(By.css('.content-loading-ripple'));
    comp.ngOnDestroy();
    expect(ld).toBeNull();
  }));
});
