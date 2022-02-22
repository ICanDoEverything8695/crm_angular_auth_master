import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { IntegrationFormComponent } from './integration-form/integration-form.component';
import { integrations_sidebar_routing } from './routing';
import { User, Organization } from '../../../core/models';
import { IntegrationType, IntegrationOAuth, Integration, IntegrationSetting, IntegrationInfo } from '../../../core/models/integration.model';
import { IntegrationService } from '../../../core/services/integration.service';
import { OrganizationService } from '../../../core/services/organization.service';
import { SharedService } from '../../../shared/services/shared.service';
import { incTypes } from './integrationTypes';
import { userRoles } from '../../../core/user_roles';

@Component({
  selector: 'crm-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.scss']
})
export class IntegrationsComponent implements OnInit {

  sidebar_menus = integrations_sidebar_routing;
  userRoles = userRoles;
  me: User = new User();
  organizations: Organization[] = [];
  organization: Organization = new Organization();

  integrations: Integration[] = [];
  integrationsInfo: IntegrationInfo[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private integrationService: IntegrationService,
    private organizationService: OrganizationService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.checkRoutingSegments();
  }

  onStatusChange(status): void {

  }

  editIntegration(intg: IntegrationInfo): void {
    const dialogRef = this.dialog.open(IntegrationFormComponent, {
      width: '500px',
      disableClose: true,
      data: {integrationInfo: intg, isEdit: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        intg.integration = result;
      }
    })
  }

  connect(intg: IntegrationInfo): void {
    if (intg.type.flow_type === 'form') {
      this.schemaIntegration(intg);
    } else if (intg.type.flow_type === 'oauth') {
      this.oauthIntegration(intg);
    } else {
      return;
    }
  }

  disconnect(intg: IntegrationInfo): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '300px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sharedService.setFspl(true);
        this.integrationService.disconnectIntegration(intg.integration.id).subscribe(res => {
          delete intg.integration;
          this.sharedService.setFspl(false);
          this.sharedService.showSuccessMessage('Successfully disconnected integration.');
        }, err => {
          this.sharedService.setFspl(false);
          this.sharedService.showSuccessMessage('Sorry, failed to disconnect this integration.');
        })
      }
    });
  }

  toggleActiveStatus(intg: IntegrationInfo): void {
    const flag = intg.integration.is_active ? false : true;
    const status = intg.integration.is_active ? 'deactive' : 'active';
    this.integrationService.editIntegration(intg.integration.id, flag, this.organization.id).subscribe(res => {
      intg.integration.is_active = flag;
      this.sharedService.showSuccessMessage(`Succeed to ${status} integration`);
    }, err => {
      this.sharedService.showSuccessMessage(`Sorry, failed to ${status} integration`);
    });
  }

  onSelectOranization(): void {
    this.router.navigate(['settings/integrations', this.organization.id]);
  }

  private schemaIntegration(intg: IntegrationInfo): void {
    const dialogRef = this.dialog.open(IntegrationFormComponent, {
      width: '500px',
      disableClose: true,
      data: {integrationInfo: intg}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        intg.integration = result;
      }
    })
  }

  private oauthIntegration(intg: IntegrationInfo): void {
    this.sharedService.setFspl(true);
    this.integrationService.getOAuthIntegration(intg.type.name).subscribe((res: IntegrationOAuth) => {
      location.href = res.url;
      this.sharedService.setFspl(false);
    }, err => {
      this.sharedService.showSuccessMessage('Sorry, we can not integrate this service.');
      this.sharedService.setFspl(false);
    });
  }

  private getIntegrationData(org_id?: number): void {
    this.sharedService.setFspl(true);
    Observable.forkJoin(this.integrationService.getAllIntegrationTypes(), this.integrationService.getIntegrations(org_id)).subscribe(res => {

      const typesData: IntegrationType[] = res[0];
      const integrationData: Integration[] = res[1];

      this.integrationsInfo = [];

      typesData.map(x => {
        const ttType = incTypes.find(inc => inc.id === x.id && inc.name === x.name) || new IntegrationType();
        x.img = ttType.img;
        x.label = ttType.label;
        const integrationInfo: IntegrationInfo = new IntegrationInfo();
        integrationInfo.type = x;
        this.integrationsInfo.push(integrationInfo);
      });

      this.integrationsInfo.map(x => {
        x.integration = integrationData.find(intg => intg.intg_type === x.type.name && intg.intg_type_id === x.type.id) || new Integration();
      });

      this.sharedService.setFspl(false);
    }, err => {
      this.sharedService.setFspl(false);
      this.sharedService.showSuccessMessage('Sorry, failed to get integration data. Please try again later.');
    });
  }

  private getOrganizations(id): void {
    this.organizationService.getOrganizationsD().subscribe((res: Organization[]) => {
      this.organizations = res;
      this.organization = this.organizations.find(x => x.id === +id) || new Organization();
      this.getIntegrationData(id);
    });
  }

  private checkRoutingSegments(): void {
    this.activatedRoute.params.subscribe(params => {
      this.me = this.sharedService.getCurrentUser();
      if (this.me.user_role === userRoles.KA || this.me.user_role === userRoles.KS) {
        // crm users should be able to select organizations
        this.getOrganizations(params.id);
      } else {
        this.organization.id = +params.id;
        this.getIntegrationData();
      }
    });
  }
}
