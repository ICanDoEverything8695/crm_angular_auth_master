import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { userRoles } from './core/user_roles';
import { AuthGuard, RoleGuard } from './core/auth';

import { LoginComponent, SignupComponent, ForgotPasswordComponent, ResetPasswordComponent } from './pages/auth';
import { LayoutComponent } from './pages/layout';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { IntegrationComponent } from './pages/redirect-pages/integration/integration.component';
import { BotVerifyComponent } from './pages/redirect-pages/bot-verify/bot-verify.component';

export const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  }, {
    path: 'users/verify/:token', component: SignupComponent
  }, {
    path: 'forgot_password', component: ForgotPasswordComponent
  }, {
    path: 'users/reset_password/:token', component: ResetPasswordComponent
  }, {
    path: 'intg/callback/:intg_type', component: IntegrationComponent, canActivate: [AuthGuard]
  }, {
    path: 'bot/verify/:token', component: BotVerifyComponent
  }, {
    path: '404', component: NotFoundComponent
  }, {
    path: '', component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'analytics', loadChildren: './pages/analytics/analytics.module#AnalyticsModule',
        canActivate: [AuthGuard]
      }, {
        path: 'recommendations', loadChildren: './pages/recommendations/recommendations.module#RecommendationsModule',
        canActivate: [AuthGuard]
      }, {
        path: 'datasource', loadChildren: './pages/datasource/datasource.module#DatasourceModule',
        canActivate: [AuthGuard, RoleGuard], data: {roles: [userRoles.KA]}
      }, {
        path: 'approvals', loadChildren: './pages/approvals/approvals.module#ApprovalsModule',
        canActivate: [AuthGuard, RoleGuard], data: {roles: [userRoles.KA]}
      }, {
        path: 'settings', loadChildren: './pages/settings/settings.module#SettingsModule',
        canActivate: [AuthGuard]
      }, {
        path: '**', redirectTo: 'analytics',
        canActivate: [AuthGuard]
      }
    ]
  }, {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
