import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentTypeRoutingModule } from './document-type-routing.module';
import { ListDocumentTypesComponent } from './list-document-types/list-document-types.component';
import { CreateOrUpdateDocumentTypeComponent } from './create-or-update-document-type/create-or-update-document-type.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListDocumentTypesComponent,
    CreateOrUpdateDocumentTypeComponent,
  ],
  imports: [CommonModule, DocumentTypeRoutingModule, SharedModule],
})
export class DocumentTypeModule {}
