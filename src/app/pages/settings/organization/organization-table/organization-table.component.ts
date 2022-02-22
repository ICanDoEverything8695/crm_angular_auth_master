import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { OrganizationService } from '../../../../core/services/organization.service';
import { Organization } from '../../../../core/models/organization.model';

@Component({
  selector: 'crm-organization-table',
  templateUrl: './organization-table.component.html',
  styleUrls: ['./organization-table.component.scss']
})
export class OrganizationTableComponent implements OnInit {

  @Output() editItem: EventEmitter<Organization> = new EventEmitter<Organization>();
  @Output() deleteItem: EventEmitter<Organization> = new EventEmitter<Organization>();
  @Output() restoreItem: EventEmitter<Organization> = new EventEmitter<Organization>();

  displayedColumns = ['name', 'org_type_name', 'street_number', 'street_name', 'city', 'state', 'country', 'state_code', 'country_code',
  'postal_code', 'action'];
  dataSource = new OrganizationDataSource(this.organizationService);

  constructor(
    private organizationService: OrganizationService
  ) { }

  ngOnInit() {
  }

  onEditItem(org: Organization): void {
    this.editItem.emit(org);
  }

  onDeleteItem(org: Organization): void {
    this.deleteItem.emit(org);
  }

  onRestoreItem(org: Organization): void {
    this.restoreItem.emit(org);
  }

}

export class OrganizationDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */

  constructor(
    private organizationService: OrganizationService
  ) {
    super();
    this.organizationService.getOrganizations();
  }

  connect(): Observable<Organization[]> {
    return this.organizationService.organizations$
  }

  disconnect() {}
}

