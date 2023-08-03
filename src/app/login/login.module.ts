import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginWithEmailAndPwdComponent } from './login-with-email-and-pwd/login-with-email-and-pwd.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginWithEmailAndPwdComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
