import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Organization } from '../../../../core/models/organization.model';
import { OrganizationType } from '../../../../core/models/organization-type.model';
import { OrganizationService } from '../../../../core/services/organization.service';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'crm-create-organization-modal',
  templateUrl: './create-organization-modal.component.html',
  styleUrls: ['./create-organization-modal.component.scss']
})
export class CreateOrganizationModalComponent implements OnInit {

  organization: Organization;
  organization_types: Array<OrganizationType> = [];
  organization_types_isLoading = false;

  prepopulated = true;
  isEditModal = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateOrganizationModalComponent>,
    private organizationService: OrganizationService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.organization = new Organization();
    if (this.data) {
      this.organization = JSON.parse(JSON.stringify(this.data.organization));
      this.prepopulated = this.data.prepopulated;
      this.isEditModal = this.data.isEditModal;
      if (this.isEditModal) {
        this.organization.organization_type_id = this.organization['org_type_id'];
      }
      this.getOrganizationTypes();
    }
  }

  checkValidation(): boolean {
    if (!this.organization.name) {
      return false;
    }
    if (!this.organization.organization_type_id) {
      return false;
    }
    return true;
  }

  createOrganization(): void {
    this.sharedService.setFspl(true);
    this.sharedService.cleanObject(this.organization);
    this.organizationService.createOrganization(this.organization).subscribe(res => {
      this.sharedService.setFspl(false);
      this.organizationService.organizations.value.push(res);
      this.organizationService.organizations.next(this.organizationService.organizations.value);
      this.sharedService.showSuccessMessage('Organization created successfully.');
      this.dialogRef.close(true);
    }, err => {
      this.sharedService.showSuccessMessage('Sorry, ' + err.msg);
      this.dialogRef.close(false);
      this.sharedService.setFspl(false);
    });
  }

  editOrganization(): void {
    this.sharedService.setFspl(true);
    this.sharedService.cleanObject(this.organization);
    this.organizationService.editOrganization(this.organization).subscribe(res => {
      this.sharedService.setFspl(false);
      this.exchangeObj(this.data.organization, res);
      this.sharedService.showSuccessMessage('Organization edited successfully.');
      this.dialogRef.close(true);
    }, err => {
      this.sharedService.showSuccessMessage('Sorry, ' + err.msg);
      this.dialogRef.close(false);
      this.sharedService.setFspl(false);
    });
  }

  strToNum(str): number {
    return +str;
  }

  private getOrganizationTypes(): void {
    this.organization_types_isLoading = true;

    this.organizationService.getOrganizationTypes().subscribe((res: Array<OrganizationType>) => {
      this.organization_types = res;
      this.organization_types_isLoading = false;
    });
  }

  private exchangeObj(src, dst): void {
    Object.keys(dst).forEach(key => {
      if (src[key]) {
        src[key] = dst[key];
      }
    })
  }
}
