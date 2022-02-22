import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleGuardDirective } from './role-guard.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    RoleGuardDirective
  ],
  declarations: [
    RoleGuardDirective
  ]
})
export class DirectivesModule { }
