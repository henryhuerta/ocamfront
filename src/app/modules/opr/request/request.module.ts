import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestsComponent } from './requests/requests.component';
import { CreateRequestByTypeComponent } from './requests/create-request-by-type/create-request-by-type.component';


@NgModule({
  declarations: [
    RequestsComponent,
    CreateRequestByTypeComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    SharedModule
  ]
})
export class RequestModule { }
