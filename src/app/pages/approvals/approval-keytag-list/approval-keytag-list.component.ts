import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { KeyTag } from '../../../core/models/approval.model';

@Component({
  selector: 'crm-approval-keytag-list',
  templateUrl: './approval-keytag-list.component.html',
  styleUrls: ['./approval-keytag-list.component.scss']
})
export class ApprovalKeytagListComponent implements OnInit {

  @Input() keytags: KeyTag[];
  @Input() type: string;
  @Input() gridCol: number;
  @Output() disapprove: EventEmitter<any> = new EventEmitter();
  @Output() reapprove: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  title: string;
  searchKeyword: string;

  constructor() { }

  ngOnInit() {
    if (!this.gridCol) {
      this.gridCol = 2;
    }
    if (this.type === 'approved') {
      this.title = 'Approved';
    } else if (this.type === 'disapproved') {
      this.title = 'Disapproved';
    } else if (this.type === 'pre-approved') {
      this.title = 'Pre-Approved';
    } else if (this.type === 'pre-disapproved') {
      this.title = 'Pre-Disapproved';
    }
  }

  onDisapproveItem(key: KeyTag, i: number): void {
    this.disapprove.emit({key: key, i: i});
  }

  onReapproveItem(key: KeyTag, i: number, flag: boolean): void {
    this.reapprove.emit({key: key, i: i, flag: flag});
  }
}
