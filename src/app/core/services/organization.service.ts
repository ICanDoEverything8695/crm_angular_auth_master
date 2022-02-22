import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { environment } from '../../../environments/environment';
import { Organization } from '../models/organization.model';
import { HttpHelperService } from '../helpers/http-helper.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrganizationService {

  organizations: BehaviorSubject<Organization[]> = new BehaviorSubject<Organization[]>([]);

  constructor(
    private http: HttpHelperService
  ) { }

  get organizations$(): Observable<Organization[]> {
    return this.organizations.asObservable();
  }

  getOrganizations() {
    const url = environment.baseAPIUrl + 'organizations/';
    return this.http.get(url, null, true,  null)
      .map(x => x.json())
      .subscribe((res: Organization[]) => {
        this.organizations.next(res);
      }, err => {
        console.log(err);
      })
  }

  getOrganizationsD() {
    const url = environment.baseAPIUrl + 'organizations/';
    return this.http.get(url, null, true, null)
      .map(x => x.json())
  }

  getOrganizationById(org_id) {
    const url = environment.baseAPIUrl + 'organizations/' + org_id;
    return this.http.get(url, null, true, null)
      .map(x => x.json());
  }

  getOrganizationTypes() {
    const url = environment.baseAPIUrl + 'organizations/types/';
    return this.http.get(url, null, true, null)
      .map(x => x.json())
  }

  getDataFromClearbit(domain: string) {
    const url = environment.baseAPIUrl + 'organizations/clearbit/' + domain;
    return this.http.get(url, null, true, null)
      .map(x => x.json())
  }

  getUsersByOrganizationId(org_id: number) {
    const url = environment.baseAPIUrl + 'organizations/' + org_id + '/users';
    return this.http.get(url, null, true, null)
      .map(x => x.json());
  }

  getUserFromOrgByUserId(org_id: number, user_id: string) {
    const url = environment.baseAPIUrl + 'organizations/' + org_id + '/users/' + user_id;
    return this.http.get(url, null, true, null)
      .map(x => x.json());
  }

  createOrganization(organization: Organization) {
    const url = environment.baseAPIUrl + 'organizations/';
    return this.http.post(url, organization, false, true, null)
      .map(x => x);
  }

  editOrganization(organization: Organization) {
    const url = environment.baseAPIUrl + 'organizations/' + organization['id'];
    delete this.organizations['id'];
    return this.http.put(url, organization, false, true, null)
      .map(x => x);
  }

  deleteOrganization(organization: Organization) {
    const url = environment.baseAPIUrl + 'organizations/' + organization['id'];
    return this.http.delete(url, false, true, null)
      .map(x => x);
  }

  retoreOrganization(organization: Organization) {
    const url = environment.baseAPIUrl + 'organizations/' + organization['id'];
    return this.http.patch(url, false, false, true)
      .map(x => x);
  }

}
