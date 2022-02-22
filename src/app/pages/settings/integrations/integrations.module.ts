import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchemaFormModule, WidgetRegistry } from 'angular2-schema-form';
import { MaWidgetRegistry } from '../../../shared/widget/maWidgetRegistry';
import { WidgetsModule } from '../../../shared/widget/widget.module';
import { ComponentsModule } from '../../../shared/components/components.module';

import { IntegrationService } from '../../../core/services/integration.service';
import { OrganizationService } from '../../../core/services/organization.service';

import { MaterialModule } from '../../../shared/material/material.module';
import { IntegrationsRoutingModule } from './integrations-routing.module';
import { IntegrationsComponent } from './integrations.component';
import { IntegrationFormComponent } from './integration-form/integration-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SchemaFormModule,
    MaterialModule,
    ComponentsModule,
    WidgetsModule,
    IntegrationsRoutingModule
  ],
  declarations: [IntegrationsComponent, IntegrationFormComponent],
  providers: [
    IntegrationService,
    OrganizationService,
    {provide: WidgetRegistry, useClass: MaWidgetRegistry},
  ],
  entryComponents: [
    IntegrationFormComponent
  ]
})
export class IntegrationsModule { }
