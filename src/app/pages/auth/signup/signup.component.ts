import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'app/core/auth';
import { SharedService } from 'app/shared/services';

import { Error } from 'app/core/models';

@Component({
  selector: 'crm-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  error: Error = new Error();
  token = '';

  userInfo = {
    email: '',
    username: ''
  };

  tokenIsInvalid = false;
  tokenErrorFromServer: string;

  newRegistration = {
    temporary_pass: '',
    new_pass: '',
    confirm_pass: ''
  };

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.token = params['token'];
      this.getUserInfo();
    });
  }

  signup(f): void {
    if (this.newRegistration.new_pass !== this.newRegistration.confirm_pass) {
      this.error.message = 'Password does not match.';
      this.error.isError = true;
      return;
    }
    if (f.form.valid) {
      this.error.isError = false;
      this.sharedService.setFspl(true);
      this.authService.verifyUser(this.token, this.newRegistration.temporary_pass, this.newRegistration.new_pass).subscribe(res => {
        this.sharedService.setFspl(false);
        if (res.success) {
          this.router.navigate(['/login']);
        } else {
          this.error.isError = true;
          this.error.message = 'Sorry, Something went wrong. Please contact with customer support.'
        }
      });
    }
  }

  private getUserInfo(): void {
    this.sharedService.setFspl(true);
    this.authService.getUserInfoByToken(this.token).subscribe(res => {
      this.userInfo.username = res.username;
      this.userInfo.email = res.email;
      this.sharedService.setFspl(false);
      this.tokenIsInvalid = false;
    }, (err) => {
      this.sharedService.setFspl(false);
      this.tokenIsInvalid = true;
      this.tokenErrorFromServer = 'Failed to find user by validation token.';
    })
  }
}
