import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { AccountDto } from './dtos/account-dto';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient, private _config: ConfigService) {}

  getAccountByNumberAccount(
    accountNumber: string,
    accountTypeId: number
  ): Observable<AccountDto> {
    return this.http.get<AccountDto>(
      `${this._config.config.data}Account/GetByAccountNumber?accountNumber=${accountNumber}&accountTypeId=${accountTypeId}`
    );
  }
}
