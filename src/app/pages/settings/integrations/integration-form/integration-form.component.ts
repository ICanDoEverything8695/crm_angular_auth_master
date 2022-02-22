import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IntegrationInfo} from '../../../../core/models/integration.model';
import {IntegrationService} from '../../../../core/services/integration.service';
import {SharedService} from '../../../../shared/services/shared.service';

@Component({
  selector: 'crm-integration-form',
  templateUrl: './integration-form.component.html',
  styleUrls: ['./integration-form.component.scss']
})
export class IntegrationFormComponent implements OnInit {

  intg: IntegrationInfo = new IntegrationInfo();
  settings: any;
  formModel: any;
  isEditModal: boolean;

  constructor(
    public dialogRef: MatDialogRef<IntegrationFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private integrationService: IntegrationService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    if (this.data) {
      this.intg = this.data.integrationInfo;
      this.isEditModal = this.data.isEdit;
      if (this.isEditModal) {
        this.formModel = this.intg.integration.settings;
      }
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {

    const required = this.intg.type.details['required'];

    for (let i = 0; i < required.length; i ++) {
      if (!this.settings[required[i]]) {
        return;
      }
    }

    if (this.isEditModal) {
      this.editIntegration();
    } else {
      this.createNewIntegration();
    }
  }

  onFormChange(e): void {
    this.settings = e.value;
  }

  private createNewIntegration(): void {
    this.integrationService.createSchemaIntegration(this.intg.type.name, this.settings).subscribe(res => {
      this.dialogRef.close(res);
      this.sharedService.showSuccessMessage('Successfully integrated service.');
    }, err => {
      this.dialogRef.close(false);
      this.sharedService.showSuccessMessage('Sorry, Service integration failed. Please try again later.');
    });
  }

  private editIntegration(): void {
    this.integrationService.editSchemaIntegration(this.intg.integration.id, this.settings).subscribe(res => {
      this.dialogRef.close(res);
      this.sharedService.showSuccessMessage('Successfully edited integration.');
    }, err => {
      this.dialogRef.close(false);
      this.sharedService.showSuccessMessage('Sorry, Edit integration failed. Please try again later.');
    })
  }
}
