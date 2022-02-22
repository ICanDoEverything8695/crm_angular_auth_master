import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../../shared/material/material.module';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { NgPipesModule } from 'ngx-pipes';

import { ApprovalService } from '../../core/services/approval.service';
import { DatasourceService } from '../../core/services/datasource.service';

import { ApprovalsRoutingModule } from './approvals-routing.module';
import { ApprovalsComponent } from './approvals.component';
import { ApprovalItemComponent } from './approval-item/approval-item.component';
import { ApprovalEditItemModalComponent } from './approval-edit-item-modal/approval-edit-item-modal.component';
import { ApprovalKeytagListComponent } from './approval-keytag-list/approval-keytag-list.component';

@NgModule({
  imports: [
    CommonModule,
    ApprovalsRoutingModule,
    FormsModule,
    MaterialModule,
    AngularDualListBoxModule,
    NgPipesModule
  ],
  declarations: [
    ApprovalsComponent,
    ApprovalItemComponent,
    ApprovalEditItemModalComponent,
    ApprovalKeytagListComponent
  ],
  providers: [
    ApprovalService,
    DatasourceService
  ],
  entryComponents: [
    ApprovalEditItemModalComponent
  ]
})
export class ApprovalsModule { }
