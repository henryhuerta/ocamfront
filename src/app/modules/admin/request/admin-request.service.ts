import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { RequestDTO } from './dtos/request';

@Injectable({
  providedIn: 'root',
})
export class AdminRequestService {
  constructor(private http: HttpClient, private _config: ConfigService) { }

  getAll(): Observable<RequestDTO[]> {
    return this.http.get<RequestDTO[]>(
      `${this._config.config.data}Request/GetAll`
    );
  }

  getById(id: number): Observable<RequestDTO> {
    return this.http.get<RequestDTO>(
      `${this._config.config.data}Request/GetById?id=${id}`
    );
  }

  reject(model: RequestDTO): Observable<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}Request/Reject`, model
    );
  }

  approve(id: number): Observable<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}Request/Approve`, id);
  }
}
