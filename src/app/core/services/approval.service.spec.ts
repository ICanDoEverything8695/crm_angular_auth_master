import { TestBed, inject, fakeAsync, discardPeriodicTasks } from '@angular/core/testing';

import { MockHttpHelper } from './mock.services';
import { ApprovalService } from './approval.service';
import { HttpHelperService } from '../helpers/http-helper.service';

describe('ApprovalService', () => {

  let approvalService: ApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApprovalService,
        {provide: HttpHelperService, useClass: MockHttpHelper}
      ]
    });
  });

  beforeEach(() => {
    approvalService = TestBed.get(ApprovalService);
  });

  it('should be created', inject([ApprovalService], (service: ApprovalService) => {
    expect(service).toBeTruthy();
  }));

  it('getApprovals function should call api', fakeAsync(() => {
    let ret = null;
    approvalService.getApprovals().subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getApprovalById function should call api', fakeAsync(() => {
    let ret = null;
    approvalService.getApprovalById('id').subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getValidTags function should call api', fakeAsync(() => {
    let ret = null;
    approvalService.getValidTags('id', 'keyword_id').subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('getApprovalStatus function should call api', fakeAsync(() => {
    let ret = null;
    approvalService.getApprovalStatus('id').subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('approveKeywords function should call api', fakeAsync(() => {
    let ret = null;
    approvalService.approveKeywords('id', ['key1', 'key2']).subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('completeApproval function should call api', fakeAsync(() => {
    let ret = null;
    approvalService.completeApproval('id').subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

  it('disapproveKeyword function should call api', fakeAsync(() => {
    let ret = null;
    approvalService.disapproveKeyword('id', ['key1', 'key2']).subscribe(res => ret = res);
    expect(ret).toEqual({success: true});
    discardPeriodicTasks();
  }));

});
