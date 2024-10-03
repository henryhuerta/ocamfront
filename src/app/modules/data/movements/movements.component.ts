import { AccountTransactionService } from './movements.service';
import { AccountDto } from 'src/app/modules/data/account/dtos/account-dtos';
import { AccountService } from './../account/account.service';
import { AccountTransactionDtos } from './../account/dtos/account-transaction-dtos';
import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { DatePipe, formatDate } from '@angular/common';
import { ConfigService } from '../../../_base/services/ConfigService';
import { AuthenticationService } from '../../../_base/services/authentication.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: []
})
export class MovementsComponent extends AppComponentBase implements OnInit {

  Model: AccountTransactionDtos = new AccountTransactionDtos();
  acc: AccountDto = new AccountDto();
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  accountSource: any = {};
  constructor(
    private _accountService: AccountService,
    private _accountTransactionService: AccountTransactionService,
    private datePipe: DatePipe,
    private _configService : ConfigService,
    private _authService : AuthenticationService
    ) {
    super();
  }

  ngOnInit(): void {
    this.getAccount();
  }
  getAccount() {
    this._accountService
      .getActives()
      .subscribe((res: AccountDto[]) => {
        this.accountSource = this.getDataSourceDx(res);
      });

  }

  getAccountByIdDateRanges(){

    this._accountTransactionService.getByAccountIdDateRanges(this.acc.id,  this.datePipe.transform(this.dateFrom, 'yyyy-MM-dd')!, this.datePipe.transform(this.dateTo, 'yyyy-MM-dd')!)
    .subscribe((response_: AccountTransactionDtos) => {
      this.Model = response_;
    });
  }

  validMovement(): boolean{
    return this.acc.id > 0 ;
  }

  print() {
    window.open(
      `${this._configService.config.report}AccountTransactions/PrintAccountTransactions?accountId=${this.acc.id}&dateFrom=${
        this.datePipe.transform(this.dateFrom, 'yyyy-MM-dd')
      }&dateTo=${this.datePipe.transform(this.dateTo, 'yyyy-MM-dd')
      }&token=${this._authService.currentUserValue.tenantId}`,
      "_blank"
    );
  }
}
