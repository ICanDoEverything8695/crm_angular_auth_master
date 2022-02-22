import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { KeyTag } from '../../../core/models/approval.model';
import { ApprovalService } from '../../../core/services/approval.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'crm-approval-edit-item-modal',
  templateUrl: './approval-edit-item-modal.component.html',
  styleUrls: ['./approval-edit-item-modal.component.scss']
})
export class ApprovalEditItemModalComponent implements OnInit {

  tag: KeyTag = new KeyTag();
  ne_tags: NeTag[] = [];
  datasource_id: number;
  isLoading_ne_tags = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ApprovalEditItemModalComponent>,
    private approvalService: ApprovalService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    if (this.data) {
      this.tag = this.data.key;
      this.datasource_id = this.data.datasource_id;

      this.getValidTag();
    }
  }

  onSelectNeTag(): void {
    this.tag.display_name = `${this.tag.keyword_name} (${this.ne_tags.find(x => x.id === this.tag.new_tag_id).name})`
  }

  onSaveKeyEdit(): void {
    this.dialogRef.close({key: this.tag, res: true});
  }

  private getValidTag() {
    this.isLoading_ne_tags = true;
    this.approvalService.getValidTags(this.datasource_id, this.tag.keyword_id).subscribe(res => {
      this.isLoading_ne_tags = false;
      this.ne_tags = res.data;
    }, err => {
      this.isLoading_ne_tags = false;
      this.ne_tags = [];
      this.sharedService.showSuccessMessage('Sorry, failed to getting tag options');
    });
  }
}

export class NeTag {
  id: number;
  name: string;
}
