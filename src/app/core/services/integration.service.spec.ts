import {TestBed, inject, fakeAsync, discardPeriodicTasks} from '@angular/core/testing';

import { MockHttpHelper } from './mock.services';
import { HttpHelperService } from '../helpers/http-helper.service';

import { IntegrationService } from './integration.service';

describe('IntegrationService', () => {

  let integrationService: IntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IntegrationService,
        {provide: HttpHelperService, useClass: MockHttpHelper}
      ],
    });
  });

  beforeEach(() => {
    integrationService = TestBed.get(IntegrationService);
  });

  it('should be created', inject([IntegrationService], (service: IntegrationService) => {
    expect(service).toBeTruthy();
  }));

  it('getAllIntegrationTypes function should make valid http request', fakeAsync(() => {
    let ret = null;
    integrationService.getAllIntegrationTypes().subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getIntegrations function should make valid http request', fakeAsync(() => {
    let ret = null;
    integrationService.getIntegrations().subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getIntegrations function should make valid http request with dedicated org id', fakeAsync(() => {
    let ret = null;
    integrationService.getIntegrations(1).subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getOAuthIntegration function should make valid http request', fakeAsync(() => {
    let ret = null;
    integrationService.getOAuthIntegration('type').subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('createNewIntegration function should make valid http request', fakeAsync(() => {
    let ret = null;
    integrationService.createNewIntegration('type', 'code').subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('disconnectIntegration function should make valid http request', fakeAsync(() => {
    let ret = null;
    integrationService.disconnectIntegration('type').subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('createSchemaIntegration function should make valid http request', fakeAsync(() => {
    let ret = null;
    integrationService.createSchemaIntegration('type', null).subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('editSchemaIntegration function should make valid http request', fakeAsync(() => {
    let ret = null;
    integrationService.editSchemaIntegration('type', null).subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('editIntegration function should make valid http request', fakeAsync(() => {
    let ret = null;
    integrationService.editIntegration(1, 'status', 1).subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));
});
