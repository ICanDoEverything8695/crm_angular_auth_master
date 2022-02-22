import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'app/shared/material/material.module';

import { LoginComponent, SignupComponent, ForgotPasswordComponent, ResetPasswordComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ]
})
export class AuthModule { }
