import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { userRoles } from '../../core/user_roles';
import { RoleGuard, AuthGuard } from '../../core/auth/guards';
import { SettingsComponent, ProfileComponent, UsersComponent } from '.';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      }, {
        path: 'organizations/:org_id',
        component: UsersComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: [userRoles.KA, userRoles.AA, userRoles.SA, userRoles.BA]}
      }, {
        path: 'integrations',
        loadChildren: './integrations/integrations.module#IntegrationsModule',
        canActivate: [RoleGuard, AuthGuard],
        data: {roles: [userRoles.KA, userRoles.AA, userRoles.SA, userRoles.BA, userRoles.KS]}
      }, {
        path: 'organization',
        loadChildren: './organization/organization.module#OrganizationModule',
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: [userRoles.KA]}
      }, {
        path: '**',
        redirectTo: 'profile'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
