import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateOrUpdateRequestTypesComponent } from './create-or-update-request-types/create-or-update-request-types.component';
import { ListRequestTypesComponent } from './list-request-types/list-request-types.component';
import { RequestTypeRoutingModule } from './request-types.routing';
import { CreateOrUpdateRequestTypeDocumentComponent } from './create-or-update-request-type-document/create-or-update-request-type-document.component';



@NgModule({
  declarations: [CreateOrUpdateRequestTypesComponent, ListRequestTypesComponent, CreateOrUpdateRequestTypeDocumentComponent],
  imports: [
    SharedModule,
    RequestTypeRoutingModule
  ]
})
export class RequestTypesModule { }
