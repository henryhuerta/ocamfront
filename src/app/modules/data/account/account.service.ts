import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { AccountDto } from './dtos/account-dtos';
import { AccountTransactionDtos } from './dtos/account-transaction-dtos';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  constructor(private http: HttpClient,
    private _config: ConfigService) {
      this.isLoadingSubject = new BehaviorSubject<boolean>(false);
      this.isLoading$ = this.isLoadingSubject.asObservable();
  
     }

  getHistoryByAccountId(id: number): Observable<AccountTransactionDtos[]> {
    return this.http.get<AccountTransactionDtos[]>(`${this._config.config.data}AccountTransaction/GetByAccountId?id=${id}`);
  }

  getAll(): Observable<AccountDto[]> {
    this.isLoadingSubject.next(true);
    return this.http.get<AccountDto[]>(`${this._config.config.data}Account/GetAll`).pipe(
      tap(() => {
        this.isLoadingSubject.next(false);
      }),);
  }
  getById(id: number): Observable<AccountDto> {
    return this.http.get<AccountDto>(`${this._config.config.data}Account/GetById?id=${id}`)
  }
  getActives(): Observable<AccountDto[]> {
    return this.http.get<AccountDto[]>(`${this._config.config.data}Account/GetActives`);
  }
}
