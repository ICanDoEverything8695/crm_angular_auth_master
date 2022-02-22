import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { flyInOut } from '../../../shared/variables/animations';
import { Organization } from '../../../core/models/organization.model';
import { SharedService } from '../../../shared/services/shared.service';
import { OrganizationService } from '../../../core/services/organization.service';
import { CreateOrganizationModalComponent } from './create-organization-modal/create-organization-modal.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'crm-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
  animations: [flyInOut]
})
export class OrganizationComponent implements OnInit {

  org_domain = {
    value: '',
    hasError: false,
    isLoading: false
  };

  constructor(
    private organizationService: OrganizationService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  addNewOrganization(): void {
    this.org_domain.isLoading = true;
    this.org_domain.hasError = false;
    this.organizationService.getDataFromClearbit(this.org_domain.value).subscribe(res => {
      this.org_domain.isLoading = false;
      this.openOrganizationModal(res, true);
    }, err => {
      this.openOrganizationModal(null, false);
      this.org_domain.isLoading = false;
      this.org_domain.hasError = true;
    });
  }

  onEditItem(org: Organization): void {
    const dialogRef = this.dialog.open(CreateOrganizationModalComponent, {
      data: {organization: org, prepopulated: true, isEditModal: true },
      width: '600px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => result);
  }

  onDeleteItem(org: Organization): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '300px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.organizationService.deleteOrganization(org).subscribe(res => {
          org.is_deleted = true;
          this.sharedService.showSuccessMessage('Organization deleted successfully.');
        }, err => {
          this.sharedService.showSuccessMessage('Sorry, ' + err.msg);
        });
      }
    });
  }

  onRestoreItem(org: Organization): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '300px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.organizationService.retoreOrganization(org).subscribe(res => {
          org.is_deleted = false;
          this.sharedService.showSuccessMessage('Successfully restored organization');
        }, err => {
          this.sharedService.showSuccessMessage('Sorry, ' + err.msg);
        })
      }
    });

  }

  private openOrganizationModal(res: any, fetched: boolean): void {
    const organization: Organization = new Organization();
    this.initializeOrganizationData(organization, res);
    const dialogRef = this.dialog.open(CreateOrganizationModalComponent, {
      data: {organization: organization, prepopulated: fetched},
      width: '600px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => result);
  }

  private initializeOrganizationData(org: Organization, res: any): void {
    if (res === null) {
      return;
    }
    if (!res.geo) {
      return;
    }
    org.name = res.legalName;
    org.street_number = res.geo.streetNumber;
    org.street_name = res.geo.streetName;
    org.city = res.geo.city;
    org.state = res.geo.state;
    org.state_code = res.geo.stateCode;
    org.postal_code = res.geo.postalCode;
    org.country = res.geo.country;
    org.country_code = res.geo.countryCode;
    org.lat = res.geo.lat;
    org.lng = res.geo.lng;
  }

}
