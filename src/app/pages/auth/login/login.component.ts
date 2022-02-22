import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/core/auth';
import { SharedService } from '../../../shared/services';

import { Auth, Error } from 'app/core/models';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: Auth = new Auth();
  rememberMe = false;
  error: Error = new Error();

  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.user.username = '';
    this.user.password = '';
  }

  login(f): void {
    if (!this.user.username || !this.user.password) {
      this.error.isError = true;
      this.error.message = 'All fields are required.';
      return;
    }
    if (f.form.valid) {
      this.sharedService.setFspl(true);
      this.error.isError = false;
      this.authService.login(this.user, this.rememberMe).subscribe((res) => {
        this.sharedService.setFspl(false);
        if (res.success) {
          this.router.navigate(['/']);
        }
      }, (err) => {
        this.sharedService.setFspl(false);
        this.error.isError = true;
        this.error.message = 'The username/password couple is invalid.';
      });
    }
  }

}
