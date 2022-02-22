import { TestBed, inject, discardPeriodicTasks, fakeAsync } from '@angular/core/testing';

import { MockHttpHelper } from './mock.services';
import { OrganizationService } from './organization.service';
import { HttpHelperService } from '../helpers/http-helper.service';
import { Organization } from '../models/organization.model';

describe('OrganizationService', () => {

  let organizationService: OrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrganizationService,
        {provide: HttpHelperService, useClass: MockHttpHelper}
      ]
    });
  });

  beforeEach(() => {
    organizationService = TestBed.get(OrganizationService);
  });

  it('should be created', inject([OrganizationService], (service: OrganizationService) => {
    expect(service).toBeTruthy();
  }));

  it('getOrganizations function should make valid http request', fakeAsync(() => {
    let ret = null;
    organizationService.organizations$.subscribe(res => ret = res);
    organizationService.getOrganizations();
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getOrganizationsD function should make valid http request', fakeAsync(() => {
    let ret = null;
    organizationService.getOrganizationsD().subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getOrganizationById function should make valid http request', fakeAsync(() => {
    let ret = null;
    organizationService.getOrganizationById('id').subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getOrganizationTypes function should make valid http request', fakeAsync(() => {
    let ret = null;
    organizationService.getOrganizationTypes().subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getDataFromClearbit function should make valid http request', fakeAsync(() => {
    let ret = null;
    organizationService.getDataFromClearbit('domain').subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getUserFromOrgByUserId function should make valid http request', fakeAsync(() => {
    let ret = null;
    organizationService.getUserFromOrgByUserId(1, 'user_id').subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getUsersByOrganizationId function should make valid http request', fakeAsync(() => {
    let ret = null;
    organizationService.getUsersByOrganizationId(1).subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('createOrganization function should make valid http request', fakeAsync(() => {
    let ret = null;
    organizationService.createOrganization(new Organization()).subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('editOrganization function should make valid http request', fakeAsync(() => {
    let ret = null;
    organizationService.editOrganization(new Organization()).subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('deleteOrganization function should make valid http request', fakeAsync(() => {
    let ret = null;
    organizationService.deleteOrganization(new Organization()).subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('retoreOrganization function should make valid http request', fakeAsync(() => {
    let ret = null;
    organizationService.retoreOrganization(new Organization()).subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));
});
