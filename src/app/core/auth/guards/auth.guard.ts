import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models';
import { AuthService } from 'app/core/auth';
import { SharedService } from '../../../shared/services/shared.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedServie: SharedService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      return this.authService.checkTokenSession().map((res: User) => {
        this.sharedServie.setCurrentUser(res);
        return true;
      }).catch((err) => {
        this.router.navigate(['/login']);
        return Observable.of(false);
      })

  }
} /* istanbul ignore next */
