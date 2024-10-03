import { NgModule } from '@angular/core';
import { ListAccountsComponent } from './list-account/list-accounts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountRoutingModule } from './account.routing';
import { AccountTransactionHistoryComponent } from './account-transaction-history/account-transaction-history.component';



@NgModule({
  declarations: [
    AccountTransactionHistoryComponent, ListAccountsComponent
  ],
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  exports: [
    AccountTransactionHistoryComponent, ListAccountsComponent
  ]
})
export class AccountModule { }
