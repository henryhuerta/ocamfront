import { AccountTransactionDtos } from './../account/dtos/account-transaction-dtos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountTransactionService {
  constructor(private http: HttpClient,
    private _config: ConfigService) { }

getByAccountIdDateRanges(id: number, dateFrom: string, dateTo: string): Observable<AccountTransactionDtos> {
    return this.http.get<AccountTransactionDtos>(`${this._config.config.data}AccountTransaction/GetTransactionByAccountIdDateRanges?accountId=${id}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
}
}
