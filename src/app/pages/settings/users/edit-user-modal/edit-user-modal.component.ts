import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'crm-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {

  user: User = new User();
  roles: string[] = [];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditUserModalComponent>,
    private userService: UserService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    if (this.data) {
      this.user = JSON.parse(JSON.stringify(this.data.user));
      this.roles = this.data.roles;
    }
  }

  submit(): void {
    this.sharedService.setFspl(true);
    this.userService.editUser(this.user).subscribe(res => {
      this.sharedService.setFspl(false);
      this.sharedService.showSuccessMessage('User successfully updated.');
      this.dialogRef.close(true);
    }, err => {
      this.sharedService.setFspl(false);
      this.sharedService.showSuccessMessage('Sorry, we can not update user information.');
    });
  }

}
