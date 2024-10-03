import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountTypeRoutingModule } from './account-type-routing.module';
import { CreateOrUpdateAccountTypeComponent } from './create-or-update-account-type/create-or-update-account-type.component';
import { ListAccountTypesComponent } from './list-account-types/list-account-types.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateOrUpdateAccountRequirementComponent } from './create-or-update-account-requirement/create-or-update-account-requirement.component';
import { CreateOrUpdateAccountDocumentComponent } from './create-or-update-account-document/create-or-update-account-document.component';

@NgModule({
  declarations: [
    CreateOrUpdateAccountTypeComponent,
    ListAccountTypesComponent,
    CreateOrUpdateAccountRequirementComponent,
    CreateOrUpdateAccountDocumentComponent,
  ],
  imports: [CommonModule, AccountTypeRoutingModule, SharedModule],
})
export class AccountTypeModule {}
