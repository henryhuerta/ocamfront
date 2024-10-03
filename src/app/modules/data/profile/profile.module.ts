import { AccountModule } from './../account/account.module';
import { ProfileRoutingModule } from './profile.routing';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectRequestModule } from '../project-request/project-request.module';
import { AuthModule } from '../../auth/auth.module';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    AccountModule,
    ProjectRequestModule,
    AuthModule
  ],
  providers:[DatePipe],
})
export class ProfileModule { }
