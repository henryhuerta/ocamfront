import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthComponent } from './auth.component';
import { TranslationModule } from '../i18n/translation.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmForgotPasswordComponent } from './confirm-forgot-password/confirm-forgot-password.component';
import { PlantsTemporaryComponent } from './components/plants-temporary/plants-temporary.component';
import { ConfirmEmailAccountComponent } from './components/confirm-email-account/confirm-email-account.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthComponent,
    ConfirmForgotPasswordComponent,
    PlantsTemporaryComponent,
    ConfirmEmailAccountComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [ RegistrationComponent]
})
export class AuthModule { }
