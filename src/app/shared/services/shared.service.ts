import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';

import { User } from '../../core/models';

@Injectable()
export class SharedService {

  currentUser: User = new User();

  private fullScreenPreLoader = new Subject<boolean>();

  fsplObs$ = this.fullScreenPreLoader.asObservable();

  constructor(
    private snackBar: MatSnackBar
  ) { }

  setFspl(flag: boolean): void {
    this.fullScreenPreLoader.next(flag);
  }

  setCurrentUser(currentUser: User): void {
    this.currentUser = currentUser;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close',{
      duration: 6000
    });
  }

  cleanObject(obj: any): void {
    Object.keys(obj).forEach(key => {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    })
  }

}
