import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ListRequestsComponent } from './request/list-requests/list-requests.component';
import { RejectRequestComponent } from './request/reject-request/reject-request.component';
import { DocumentsRequestComponent } from './request/documents-request/documents-request.component';
import { DocumentsProjectRequestComponent } from './project-request/documents-project-request/documents-project-request.component';
import { ListProjectRequestComponent } from './project-request/list-project-request/list-project-request.component';
import { RejectProjectRequestComponent } from './project-request/reject-project-request/reject-project-request.component';

@NgModule({
  declarations: [
    ListProjectRequestComponent,
    RejectProjectRequestComponent,
    DocumentsProjectRequestComponent,
    ListRequestsComponent,
    RejectRequestComponent,
    DocumentsRequestComponent,
  ],
  imports: [CommonModule, SharedModule, AdministrationRoutingModule],
})
export class AdministrationModule {}
