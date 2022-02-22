import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ApprovalEditItemModalComponent } from '../approval-edit-item-modal/approval-edit-item-modal.component';
import { ApprovalService } from '../../../core/services/approval.service';
import { DatasourceService } from '../../../core/services/datasource.service';
import { SharedService } from '../../../shared/services/shared.service';
import { KeyTag, KeyTagState, DSImage } from '../../../core/models';

@Component({
  selector: 'crm-approval-item',
  templateUrl: './approval-item.component.html',
  styleUrls: ['./approval-item.component.scss']
})
export class ApprovalItemComponent implements OnInit {

  keyTags: KeyTag[] = [];
  url = '';
  approval_id = 0;
  gridCol = 2;

  showDualListbox = false;

  approvedKeyTags: KeyTag[] = [];
  disapprovedKeyTags: KeyTag[] = [];
  preApprovedKeyTags: KeyTag[] = [];
  preDisapprovedKeyTags: KeyTag[] = [];
  pending_approvedKeyTags: KeyTag[] = [];
  newKeyTags: KeyTag[] = [];

  images: DSImage[] = [];
  stats = {newCount: 0, approvedCount: 0, disapprovedCount: 0, preApprovedCount: 0, preDisapprovedCount: 0};

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private approvalService: ApprovalService,
    private dataSourceService: DatasourceService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.initiatePage();
    this.getStats();
    if (window.screen.width < 950) {
      this.gridCol = 1;
    }
  }

  onResize(event) {
    const element = event.target.innerWidth;

    if (element < 950) {
      this.gridCol = 1;
    }

    if (element > 950) {
      this.gridCol = 2;
    }
  }

  onEdit(item): void {
    const key: KeyTag = this.getKeyById(item._id);
    const dialogRef = this.dialog.open(ApprovalEditItemModalComponent, {data: {key: key, datasource_id: this.approval_id}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.newKeyTags.findIndex(x => x.id === key.id);
        this.newKeyTags.splice(index, 1);
        setTimeout(() => {
          this.newKeyTags.push(result.key);
          this.pending_approvedKeyTags.push(this.newKeyTags.find(x => x.id === item._id));
        }, 1)
      }
    });
  }

  onApproveKeywords(): void {
    const keywords = [];
    this.sharedService.setFspl(true);
    this.pending_approvedKeyTags.map(x => {
      keywords.push(x.new_tag_id ? {keyword_id: x.keyword_id, tag_id: x.tag_id, new_tag_id: x.new_tag_id} : {keyword_id: x.keyword_id, tag_id: x.tag_id});
    });
    this.approvalService.approveKeywords(this.approval_id, keywords).subscribe(res => {

      // move pending approved keywords to approved list
      this.pending_approvedKeyTags.map(x => {
        x.keyword_state = 'Approved';
        const xtag = JSON.parse(JSON.stringify(x));
        this.approvedKeyTags.push(xtag);
      });

      const total = this.pending_approvedKeyTags.length;

      for (let i = 0; i < this.newKeyTags.length; i ++) {
        const pIndex = this.pending_approvedKeyTags.findIndex(key => key.id === this.newKeyTags[i].id);
        if (pIndex >= 0) {
          this.pending_approvedKeyTags.splice(pIndex, 1);
          this.newKeyTags.splice(i, 1);
          i--;
        }
      }
      this.pending_approvedKeyTags = [];

      this.getStats();

      this.sharedService.setFspl(false);
      this.sharedService.showSuccessMessage('Successfully approved keywords');
    }, err => {
      this.sharedService.setFspl(false);
      this.sharedService.showSuccessMessage('Sorry, Something went wrong while approving selected keywords.');
    });
  }

  async onDisapproveItem(key: KeyTag, index: number) {
    this.sharedService.setFspl(true);
    const keywords = [{keyword_id: key.keyword_id, tag_id: key.tag_id}];
    try {
      await this.approvalService.disapproveKeyword(this.approval_id, keywords).toPromise();
      // change key state and delete key from list
      key.keyword_state = 'Disapproved';
      this.approvedKeyTags.splice(index, 1);
      this.disapprovedKeyTags.push(key);
      this.getStats();
      this.sharedService.setFspl(false);
      this.sharedService.showSuccessMessage('Successfully disapproved keyword');
    } catch (e) {
      this.sharedService.setFspl(false);
      this.sharedService.showSuccessMessage('Sorry, Something went wrong while approving selected keywords.');
    }
  }

  async onReapproveItem(key: KeyTag, index: number, edit: boolean, from: string) {
    try {
      if (edit) {
        const clonedKey = JSON.parse(JSON.stringify(key));
        const dialogRef = this.dialog.open(ApprovalEditItemModalComponent, {data: {key: clonedKey, datasource_id: this.approval_id}});
        const result = await dialogRef.afterClosed().toPromise();
        if (result) {
          const keywords = [{keyword_id: result.key.keyword_id, tag_id: result.key.tag_id, new_tag_id: result.key.new_tag_id}];
          await this.approvalService.approveKeywords(this.approval_id, keywords).toPromise();
        }
      } else {
        const keywords = [{keyword_id: key.keyword_id, tag_id: key.tag_id}];
        await this.approvalService.approveKeywords(this.approval_id, keywords).toPromise();
        key.keyword_state = 'Approved';
      }
      if (from === 'disapproved') {
        this.disapprovedKeyTags.splice(index, 1);
      } else if (from === 'pre-approved') {
        this.preApprovedKeyTags.splice(index, 1);
      } else if (from === 'pre-disapproved') {
        this.preDisapprovedKeyTags.splice(index, 1);
      }
      this.approvedKeyTags.push(key);
      this.getStats();
      this.sharedService.showSuccessMessage('Successfully approved keyword');
    } catch (e) {
      this.getStats();
      this.sharedService.showSuccessMessage('Something went wrong...');
    }
  }

  onCompleteApproval(): void {
    this.sharedService.setFspl(true);
    this.approvalService.completeApproval(this.approval_id).subscribe(res => {
      this.sharedService.setFspl(false);
      this.router.navigate(['/approvals']);
      this.sharedService.showSuccessMessage('You have successfully completed approvals.');
    }, err => {
      this.sharedService.setFspl(false);
      this.sharedService.showSuccessMessage('Sorry, Something went wrong while completing approvals.');
    });
  }

  deleteImage(image: DSImage, index): void {
    this.dataSourceService.deleteImage(image.id).subscribe(res => {
      this.sharedService.showSuccessMessage('Successfully deleted image.');
      this.images.splice(index, 1);
    }, err => {
      this.sharedService.showSuccessMessage('Sorry, failed to delete image. Please try again later');
    });
  }

  toggleView(flag: boolean) {
    this.showDualListbox = flag;
    this.cdr.detectChanges();
  }

  private getKeyById(id): KeyTag {
    return this.keyTags.find(obj => obj.id === id);
  }

  private initiatePage(): void {
    this.sharedService.setFspl(true);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.approval_id = params.id;
      this.approvalService.getApprovalById(this.approval_id).subscribe(res => {
        this.url = res.url;
        this.filterKeyTags(res.data);
        this.sharedService.setFspl(false);
      }, err => {
        this.sharedService.showSuccessMessage('Sorry, failed to get approval keys.');
        this.sharedService.setFspl(false);
      });

      this.dataSourceService.getImagesFromDatasource(params['id']).subscribe((res: DSImage[]) => {
        this.images = res;
      }, err => {
        this.sharedService.showSuccessMessage('Sorry, failed to get Images from datasource');
      });

    });
  }

  private filterKeyTags(res: KeyTag[]): void {
    this.keyTags = res;
    this.keyTags.map((tag, index) => {tag.id = index; tag.display_name = `${tag.keyword_name} (${tag.tag_name})`});
    this.pending_approvedKeyTags = [];
    this.approvedKeyTags = this.keyTags.filter(tag => tag.keyword_state === 'Approved');
    this.disapprovedKeyTags = this.keyTags.filter(tag => tag.keyword_state === 'Disapproved');
    this.newKeyTags = this.keyTags.filter(tag => tag.keyword_state === 'New');
    this.preApprovedKeyTags = this.keyTags.filter(tag => tag.keyword_state === 'Auto_Approved');
    this.preDisapprovedKeyTags = this.keyTags.filter(tag => tag.keyword_state === 'Auto_Disapproved');
  }

  private getStats(): void {
    if (!this.approval_id) {
      return;
    }
    this.approvalService.getApprovalStatus(this.approval_id).subscribe(stats => {
      stats.data.map(x => {
        if (x.keyword_state === 'New') {
          this.stats.newCount = x.count;
        } else if (x.keyword_state === 'Disapproved') {
          this.stats.disapprovedCount = x.count;
        } else if (x.keyword_state === 'Approved') {
          this.stats.approvedCount = x.count;
        } else if (x.keyword_state === 'Auto_Approved') {
          this.stats.preApprovedCount = x.count;
        } else if (x.keyword_state === 'Auto_Disapproved') {
          this.stats.preDisapprovedCount = x.count;
        } else {
          return;
        }
      })
    });
  }
}
