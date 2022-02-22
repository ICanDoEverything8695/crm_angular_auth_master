import { TestBed, inject } from '@angular/core/testing';
import { environment } from '../../../environments/environment';

import { ApiRoutingHelperService } from './api-routing-helper.service';

describe('ApiRoutingHelperService', () => {
  let apiRoutingHelperService: ApiRoutingHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiRoutingHelperService]
    });
  });

  beforeEach(() => {
    apiRoutingHelperService = TestBed.get(ApiRoutingHelperService);
  });

  it('should be created', inject([ApiRoutingHelperService], (service: ApiRoutingHelperService) => {
    expect(service).toBeTruthy();
  }));

  it('functions must return valid url', () => {
    expect(apiRoutingHelperService.userAPIUrl()).toBe(environment.baseAPIUrl + 'users/');
    expect(apiRoutingHelperService.authAPIUrl()).toBe(environment.baseAPIUrl + 'auth');
    expect(apiRoutingHelperService.userAuthAPIUrl()).toBe(environment.baseAPIUrl + 'users/auth');
    expect(apiRoutingHelperService.userVerifyAPIUrl()).toBe(environment.baseAPIUrl + 'users/verify');
    expect(apiRoutingHelperService.forgotPassword()).toBe(environment.baseAPIUrl + 'users/reset_password');
    expect(apiRoutingHelperService.changePassword()).toBe(environment.baseAPIUrl + 'users/change_password');
    expect(apiRoutingHelperService.approvalAPIUrl()).toBe(environment.baseAPIUrl + 'approvals');
    expect(apiRoutingHelperService.organizationAPIUrl()).toBe(environment.baseAPIUrl + 'organizations/');
  });
});
