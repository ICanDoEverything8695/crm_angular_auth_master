import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Directive, Input } from '@angular/core';
import { AnalyticsComponent } from './analytics.component';
import { GraphqlService } from '../../core/services/graphql.service';
import { SharedService } from '../../shared/services/shared.service';
import { SharedMockService } from '../../test_modules/_general-services';
import { GraphqlMockService } from '../../test_modules/_http-services/graphql.mock-service';

@Directive({
  selector: 'crm-breadcrumb'
})
class MockBreadcrumbComponent {}

@Directive({
  selector: 'crm-sidebar'
})
class MockSidebarComponent {
  @Input() verticals: any;
  @Input() analytics_filter: any;
}

@Directive({
  selector: 'crm-status'
})
class MockStatusComponent {
  @Input() totalPurchases: any;
  @Input() totalPurchasesGraphData: any;
}

@Directive({
  selector: 'crm-purchases'
})
class MockPurchasesComponent {
  @Input() vendors: any;
  @Input() purchase_categories: any;
}

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;
  let graphqlService: GraphqlService;
  let sharedService: SharedMockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ AnalyticsComponent, MockBreadcrumbComponent, MockSidebarComponent, MockStatusComponent, MockPurchasesComponent ],
      providers: [
        {provide: GraphqlService, useClass: GraphqlMockService},
        {provide: SharedService, useClass: SharedMockService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    graphqlService = TestBed.get(GraphqlService);
    sharedService = TestBed.get(SharedService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('error happens while getting all verticals, error should be handled', async(() => {
    spyOn(graphqlService, 'getAllVerticals').and.returnValue(Promise.reject({success: false}));
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(x => {
      expect(sharedService.displayingMessage).toEqual('Sorry, Something went wrong while fetching verticals data.');
    });
  }));

  it('error happens while getting vendors, error should be handled', async(() => {
    spyOn(graphqlService, 'getVendors').and.returnValue(Promise.reject({success: false}));
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(x => {
      expect(sharedService.displayingMessage).toEqual('Sorry, Something went wrong while fetching Vendors data.');
    })
  }));

  it('error happens while getting totalSum, error should be handled', async(() => {
    spyOn(graphqlService, 'getTotalPurchases').and.returnValue(Promise.reject({success: false}));
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(x => {
      expect(sharedService.displayingMessage).toEqual('Sorry, Something went wrong while fetching Total Purchase data.');
    })
  }));

  it('error happens while getting graphData, error should be handled', async(() => {
    spyOn(graphqlService, 'getTotalPurchasesGraphData').and.returnValue(Promise.reject({success: false}));
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(x => {
      expect(sharedService.displayingMessage).toEqual('Sorry, Something went wrong while fetching Total Purchase Graph data.');
    })
  }));

  it('error happens while getting category data, error should be handled', async(() => {
    spyOn(graphqlService, 'getPurchaseCategories').and.returnValue(Promise.reject({success: false}));
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(x => {
      expect(sharedService.displayingMessage).toEqual('Sorry, Something went wrong while fetching Total Purchase Categories data.');
    })
  }));
});
