import { Component, OnInit } from '@angular/core';

import { ApprovalService } from '../../core/services/approval.service';
import { SharedService } from '../../shared/services/shared.service';
import { Approval } from '../../core/models/approval.model';

@Component({
  selector: 'crm-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit {

  approvals: Array<Approval> = [];

  constructor(
    private approvalService: ApprovalService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getApprovals();
  }

  private getApprovals(): void {
    this.sharedService.setFspl(true);
    this.approvalService.getApprovals().subscribe(res => {
      this.approvals = res.data;
      this.sharedService.setFspl(false);
    }, err => {
      this.sharedService.showSuccessMessage('Sorry, Something went wrong while fetching approval data.');
      this.sharedService.setFspl(false);
    })
  }

}
