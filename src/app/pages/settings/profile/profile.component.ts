import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../core/auth/services/auth.service';
import { SharedService } from '../../../shared/services/shared.service';
import { User } from 'app/core/models';

export class PasswordModel {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

@Component({
  selector: 'crm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: User = new User();
  updatePasswordInfo: PasswordModel = new PasswordModel();
  showError = false;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getUserInformation();
  }

  submit(): void {
    this.sharedService.setFspl(true);
    const body: User = new User();
    body.first_name = this.profile.first_name;
    body.last_name = this.profile.last_name;
    this.authService.updateUserInfo(this.profile.public_id, body).subscribe(res => {
      this.sharedService.setFspl(false);
      this.sharedService.showSuccessMessage('Profile updated successfully.');
    }, err => {
      this.sharedService.setFspl(false);
    });
  }

  updatePassword(): void {
    delete this.updatePasswordInfo.confirm_password;
    this.sharedService.setFspl(true);

    this.authService.changePassword(this.updatePasswordInfo).subscribe(res => {
      this.showError = false;
      this.updatePasswordInfo = new PasswordModel();
      this.sharedService.showSuccessMessage('Password updated successfully.');
      this.sharedService.setFspl(false);
    }, err => {
      this.showError = true;
      this.sharedService.setFspl(false);
    });
  }

  customPasswordValidation(): boolean {
    if (!this.updatePasswordInfo.new_password || !this.updatePasswordInfo.current_password || !this.updatePasswordInfo.confirm_password) {
      return false;
    }
    if (this.updatePasswordInfo.new_password !== this.updatePasswordInfo.confirm_password) {
      return false;
    }
    return true;
  }

  private getUserInformation(): void {
    this.sharedService.setFspl(true);
    this.authService.checkTokenSession().subscribe(res => {
      this.authService.getUserInfo(res.public_id).subscribe((res_a: User) => {
        this.profile = res_a;
        this.sharedService.setFspl(false);
      }, err => {
        this.sharedService.setFspl(false);
      });
    }, err => {
      this.sharedService.setFspl(false);
    });
  }

}
