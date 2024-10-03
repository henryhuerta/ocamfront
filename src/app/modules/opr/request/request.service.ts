import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { RequestDTO } from './dtos/request-dto';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient, private _config: ConfigService) { }

  create(formData: FormData): Observable<RequestResult> {
    return this.http.post<RequestResult>(
      `${this._config.config.data}Request/Create`,
      formData
    );
  }
}
