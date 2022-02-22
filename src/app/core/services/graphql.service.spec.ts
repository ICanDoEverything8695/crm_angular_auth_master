import {TestBed, inject, fakeAsync, tick, discardPeriodicTasks} from '@angular/core/testing';

import { GraphqlService } from './graphql.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { AnalyticsFitler } from '../models/analytic_filter.model';

class MockLocalStorageService {
  get() {return true;}
}

describe('GraphqlService', () => {

  let graphqlService: GraphqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GraphqlService,
        {provide: LocalStorageService, useClass: MockLocalStorageService}
      ]
    });
  });

  beforeEach(() => {
    graphqlService = TestBed.get(GraphqlService);
    graphqlService.client = {request: jasmine.createSpy('request').and.returnValue(Promise.resolve({success: true}))};
  });

  it('should be created', inject([GraphqlService], (service: GraphqlService) => {
    spyOn(graphqlService, 'graphqClientInitialize').and.returnValue({request: jasmine.createSpy('request').and.returnValue(Promise.resolve({success: true}))});
    expect(service).toBeTruthy();
  }));

  it('graphqlClientInitialize function should create valid client object', inject([GraphqlService], (service: GraphqlService) => {
    graphqlService.graphqClientInitialize();
    expect(graphqlService.client).toBeTruthy();
  }));

  it('getVendors function should make valid graphql request', fakeAsync(() => {
    spyOn(graphqlService, 'graphqClientInitialize').and.returnValue({request: jasmine.createSpy('request').and.returnValue(Promise.resolve({success: true}))});
    let ret = null;
    let filter = new AnalyticsFitler();
    filter.buyer_verticals = ['a', 'b', 'c'];
    graphqlService.getVendors(filter).then(res => ret = res);
    tick();
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getAllVerticals function should make valid graphql request', fakeAsync(() => {
    spyOn(graphqlService, 'graphqClientInitialize').and.returnValue({request: jasmine.createSpy('request').and.returnValue(Promise.resolve({success: true}))});
    let ret = null;
    graphqlService.getAllVerticals().then(res => ret = res);
    tick();
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getPurchaseCategories function should make valid graphql request', fakeAsync(() => {
    spyOn(graphqlService, 'graphqClientInitialize').and.returnValue({request: jasmine.createSpy('request').and.returnValue(Promise.resolve({success: true}))});
    let ret = null;
    let filter = new AnalyticsFitler();
    filter.buyer_verticals = ['a', 'b', 'c'];
    filter.buyer_marketCap.greaterThan = 11;
    filter.buyer_marketCap.lessThan = 32000000;
    graphqlService.getPurchaseCategories(filter).then(res => ret = res);
    tick();
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getPurchaseCategories function should make valid graphql request even if buyer vertical is empty', fakeAsync(() => {
    spyOn(graphqlService, 'graphqClientInitialize').and.returnValue({request: jasmine.createSpy('request').and.returnValue(Promise.resolve({success: true}))});
    let ret = null;
    let filter = new AnalyticsFitler();
    filter.buyer_verticals = [];
    filter.buyer_marketCap.greaterThan = 11;
    filter.buyer_marketCap.lessThan = 32000000;
    graphqlService.getPurchaseCategories(filter).then(res => ret = res);
    tick();
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getTotalPurchases function should make valid graphql request', fakeAsync(() => {
    spyOn(graphqlService, 'graphqClientInitialize').and.returnValue({request: jasmine.createSpy('request').and.returnValue(Promise.resolve({success: true}))});
    let ret = null;
    let filter = new AnalyticsFitler();
    filter.buyer_verticals = ['a', 'b', 'c'];
    filter.buyer_numberOfEmployees.greaterThan = 11;
    filter.buyer_numberOfEmployees.lessThan = 3000;
    graphqlService.getTotalPurchases(filter).then(res => ret = res);
    tick();
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getTotalPurchasesGraphData function should make valid graphql request', fakeAsync(() => {
    spyOn(graphqlService, 'graphqClientInitialize').and.returnValue({request: jasmine.createSpy('request').and.returnValue(Promise.resolve({success: true}))});
    let ret = null;
    let filter = new AnalyticsFitler();
    graphqlService.getTotalPurchasesGraphData(filter).then(res => ret = res);
    tick();
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

});
