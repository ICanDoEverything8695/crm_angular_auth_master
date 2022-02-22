import { Injectable } from '@angular/core';

import { HttpHelperService } from '../helpers/http-helper.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApprovalService {

  constructor(
    private http: HttpHelperService
  ) { }

  getApprovals() {
    const url = environment.baseAPIUrl + 'approvals';
    return this.http.get(url, null, true, null)
      .map(x => x.json())
  }

  getApprovalById(id) {
    const url = environment.baseAPIUrl + 'approvals/' + id;
    return this.http.get(url, null, true, null)
      .map(x => x.json())
  }

  getValidTags(datasource_id, keyword_id) {
    const url = environment.baseAPIUrl + 'validtags/' + datasource_id + '/' + keyword_id;
    return this.http.get(url, null, true, null)
      .map(x => x.json());
  }

  getApprovalStatus(id) {
    const url = environment.baseAPIUrl + 'approvals/' + id;
    const query = {
      t: 'stats'
    };
    return this.http.get(url, query, true, null)
      .map(x => x.json());
  }

  approveKeywords(id, keywords) {
    const url = environment.baseAPIUrl + 'approvals/' + id;
    const body = {
      'keyword_state': 'approve',
      'keywords': keywords
    };
    return this.http.post(url, body, false, true, null)
      .map(x => x)
  }

  completeApproval(id) {
    const url = environment.baseAPIUrl + 'approvals/' + id;
    const body = {
      'keyword_state': 'disapproveall'
    };
    return this.http.post(url, body, false, true, null)
      .map(x => x)
  }

  disapproveKeyword(id, keywords) {
    const url = environment.baseAPIUrl + 'approvals/' + id;
    const body = {
      keyword_state: 'disapprove',
      keywords: keywords
    };
    return this.http.post(url, body, false, true, null)
      .map(x => x)
  }
}
