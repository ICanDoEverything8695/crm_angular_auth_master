import { Directive, Input, OnInit, ElementRef } from '@angular/core';

import { SharedService } from '../services/shared.service';

@Directive({
  selector: '[crmRoleGuard]'
})
export class RoleGuardDirective implements OnInit{

  @Input() crmRoleGuard: Array<string>;

  constructor(
    private el: ElementRef,
    private sharedService: SharedService
  ) {

  }

  ngOnInit() {
    const currentUser = this.sharedService.getCurrentUser();

    if (this.crmRoleGuard.indexOf(currentUser.user_role) === -1) {
      this.el.nativeElement.innerHTML = '';
    }
  }

}
