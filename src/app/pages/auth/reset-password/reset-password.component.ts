import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../core/auth/services/auth.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Error } from 'app/core/models';

@Component({
  selector: 'crm-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  error: Error = new Error();
  token = '';

  password: string;
  confirm_passowrd: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  reset(f): void {
    if (this.password !== this.confirm_passowrd) {
      this.error.isError = true;
      this.error.message = 'Password does not match.';
      return;
    }
    this.sharedService.setFspl(true);
    this.authService.resetPassword(this.token, this.password).subscribe(res => {
      this.sharedService.setFspl(false);
      this.router.navigate(['/login']);
    }, err => {
      this.error.isError = true;
      this.error.message = 'Failed to find user by validation token.';
      this.sharedService.setFspl(false);
    });
  }

}
