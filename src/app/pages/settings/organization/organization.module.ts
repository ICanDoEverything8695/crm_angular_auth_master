import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

import { OrganizationService } from '../../../core/services/organization.service';

import { MaterialModule } from '../../../shared/material/material.module';
import { ComponentsModule } from '../../../shared/components/components.module';
import { OrganizationRoutingModule } from './organization-routing.module';

import { OrganizationComponent } from './organization.component';
import { CreateOrganizationModalComponent } from './create-organization-modal/create-organization-modal.component';
import { OrganizationTableComponent } from './organization-table/organization-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    OrganizationRoutingModule,
    ComponentsModule,
    AgmCoreModule
  ],
  declarations: [OrganizationComponent, CreateOrganizationModalComponent, OrganizationTableComponent],
  providers: [
    OrganizationService
  ],
  entryComponents: [
    CreateOrganizationModalComponent
  ]
})
export class OrganizationModule { }
