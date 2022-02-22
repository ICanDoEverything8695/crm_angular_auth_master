import { Injectable } from '@angular/core';

import { HttpHelperService } from '../helpers/http-helper.service';
import { environment } from '../../../environments/environment';
import {Integration} from '../models/integration.model';

@Injectable()
export class IntegrationService {

  constructor(
    private http: HttpHelperService
  ) { }

  getAllIntegrationTypes() {
    const url = environment.baseAPIUrl + 'integrations/types/';
    return this.http.get(url, null, true, null)
      .map(x => x.json());
  }

  getIntegrations(org_id?: number) {
    let url = environment.baseAPIUrl;
    if (org_id) {
      url += 'organizations/' + org_id + '/integrations';
    } else {
      url += 'integrations/';
    }
    return this.http.get(url, null, true, null)
      .map(x => x.json());
  }

  getOAuthIntegration(intg_type) {
    const url = environment.baseAPIUrl + 'integrations/oauth/' + intg_type;
    return this.http.get(url, null, true, null)
      .map(x => x.json());
  }

  createNewIntegration(intg_type, code) {
    const url = environment.baseAPIUrl + 'integrations/';
    const body = {intg_type: intg_type, code: code, oauth: true};
    return this.http.post(url, body, false, true, null)
      .map(x => x);
  }

  createSchemaIntegration(intg_type, settings) {
    const url = environment.baseAPIUrl + 'integrations/';
    const body = {intg_type: intg_type, oauth: false, settings: settings};
    return this.http.post(url, body, false, true, null)
      .map(x => x);
  }

  editSchemaIntegration(intg_id, settings) {
    const url = environment.baseAPIUrl + 'integrations/' + intg_id;
    const body = {settings: settings};
    return this.http.put(url, body, false, true, null)
      .map(x => x);
  }

  disconnectIntegration(intg_id) {
    const url = environment.baseAPIUrl + 'integrations/' + intg_id;
    return this.http.delete(url, false, true, null)
      .map(x => x);
  }

  editIntegration(intg_id, active_status, org_id) {
    const url = environment.baseAPIUrl + 'integrations/' + intg_id;
    return this.http.put(url, {is_active: active_status}, false, true, null)
      .map(x => x);
  }

}
