import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovalsComponent } from './approvals.component';
import { ApprovalItemComponent } from './approval-item/approval-item.component';

const routes: Routes = [
  {
    path: '', component: ApprovalsComponent
  }, {
    path: ':id', component: ApprovalItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalsRoutingModule { }
