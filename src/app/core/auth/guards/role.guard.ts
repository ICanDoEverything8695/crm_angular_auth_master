import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models';
import { SharedService } from '../../../shared/services/shared.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const roles = next.data['roles'] as Array<string>;

    let currentUser: User = new User();
    currentUser = this.sharedService.getCurrentUser();

    if (roles.indexOf(currentUser.user_role) !== -1) {
      return true;
    } else {
      this.router.navigate(['/404']);
      return false;
    }
  }
}
