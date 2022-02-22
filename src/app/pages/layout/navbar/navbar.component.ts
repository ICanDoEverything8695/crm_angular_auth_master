import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { userRoles } from '../../../core/user_roles';
import { User } from '../../../core/models';
import { AuthService } from 'app/core/auth';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'crm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() toggleSideNav: EventEmitter<any> = new EventEmitter();

  currentUser: User = new User();
  userRoles = userRoles;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCurrentSession();
  }

  logout(): void {
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/login']);
    }, err => {
      this.router.navigate(['/login'])
    });
  }

  private getCurrentSession(): void {
    this.currentUser = this.sharedService.getCurrentUser();
  }
}
