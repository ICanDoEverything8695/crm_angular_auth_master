import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DirectivesModule } from '../../shared/directives/directives.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { MaterialModule } from '../../shared/material/material.module';
import { ComponentsModule } from '../../shared/components/components.module';

import { UserService, OrganizationService } from '../../core/services';

import { SettingsComponent, ProfileComponent, UsersComponent, EditUserModalComponent, CreateUserSectionComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SettingsRoutingModule,
    DirectivesModule,
    ComponentsModule
  ],
  declarations: [
    SettingsComponent,
    ProfileComponent,
    UsersComponent,
    CreateUserSectionComponent,
    EditUserModalComponent
  ],
  entryComponents: [
    EditUserModalComponent
  ],
  providers: [
    UserService,
    OrganizationService
  ]
})
export class SettingsModule { }
