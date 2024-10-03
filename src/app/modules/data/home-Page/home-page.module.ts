import { ModelUserTypeGeneratorFirstLoginComponent } from './model-user-type-generator-first-login/model-user-type-generator-first-login.component';
import { ProjectRequestModule } from './../project-request/project-request.module';
import { AccountModule } from './../account/account.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { WidgetsModule } from 'src/app/_metronic/partials';
import { MovementsComponent } from '../movements/movements.component';
import { homePageRoutingModule } from './home-page.routing';
import { HomePageComponent } from './home-page/home-page.component';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [HomePageComponent, MovementsComponent, ModelUserTypeGeneratorFirstLoginComponent],
  imports: [
    SharedModule,
    homePageRoutingModule,
    AccountModule,
    WidgetsModule,
    ProjectRequestModule
  ],
  providers: [DatePipe]
})
export class HomePageModule { }
