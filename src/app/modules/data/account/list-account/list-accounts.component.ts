import { AccountTransactionHistoryComponent } from './../account-transaction-history/account-transaction-history.component';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { AccountService } from '../account.service';
import { AccountDto } from '../dtos/account-dtos';
@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: []
})
export class ListAccountsComponent extends AppComponentBase  implements OnInit {
  @ViewChild("AccountTransaction") accounTransaction: AccountTransactionHistoryComponent;
  @Input() profileFrom:boolean = false
  @Input() accounts: AccountDto[];

  public get data (): AccountDto[]{
    return this.accounts;
  }

  constructor( private _AccountService: AccountService) {
    super();
  }

  ngOnInit(): void {
  }

  getData() {
   this._AccountService.getAll().subscribe((result: AccountDto[]) => {
    this.accounts = result;
  });
  }


  viewTransaction(data: AccountDto){
    this.accounTransaction.showTransaction(data);
  }
}
