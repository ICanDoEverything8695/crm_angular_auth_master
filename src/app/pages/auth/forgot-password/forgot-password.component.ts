import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/core/auth';
import { SharedService } from '../../../shared/services';
import { Error } from 'app/core/models';

@Component({
  selector: 'crm-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  isSuccess = false;

  email: string;
  error: Error = new Error();

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  sendMessage(f): void {
    this.sharedService.setFspl(true);
    this.authService.sendForgotPasswordMail(this.email).subscribe(res => {
      this.sharedService.setFspl(false);
      if (res.success === true) {
        this.isSuccess = true;
      }
    }, (err) => {
      if (err.status === 404) {
        this.error.message = 'Sorry, email not found.'
      } else {
        this.error.message = 'Sorry, something went wrong.';
      }
      this.error.isError = true;
      this.sharedService.setFspl(false);

    })
  }

}
