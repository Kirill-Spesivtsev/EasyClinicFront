import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './account.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    VerifyEmailComponent,
    ChangePasswordComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
