import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { AccountTypeDto } from './dtos/account-type-dto';

@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {

  constructor(private http: HttpClient, private _config: ConfigService) {}

  getAll(): Observable<AccountTypeDto[]> {
    return this.http.get<AccountTypeDto[]>(
      `${this._config.config.data}AccountType/GetAll`
    );
  }
  getById(id: number): Observable<AccountTypeDto> {
    return this.http.get<AccountTypeDto>(
      `${this._config.config.data}AccountType/GetById?id=${id}`
    );
  }
  getActives(): Observable<AccountTypeDto[]> {
    return this.http.get<AccountTypeDto[]>(
      `${this._config.config.data}AccountType/GetActives`
    );
  }
  create(model: AccountTypeDto): Observable<RequestResult> {
    return this.http.post<RequestResult>(
      `${this._config.config.data}AccountType/Create`,
      model
    );
  }
  update(model: AccountTypeDto): Observable<RequestResult> {
    return this.http.put<RequestResult>(
      `${this._config.config.data}AccountType/Update`,
      model
    );
  }
  disable(id: number): Observable<RequestResult> {
    return this.http.delete<RequestResult>(
      `${this._config.config.data}AccountType/Disable?id=${id}`
    );
  }
  enable(id: number): Observable<RequestResult> {
    return this.http.delete<RequestResult>(
      `${this._config.config.data}AccountType/Enable?id=${id}`
    );
  }
}
