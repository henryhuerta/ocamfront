import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CertifierDto } from './dtos/certifier-dto';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { RequestResult } from 'src/app/_base/models/RequestResult';

@Injectable({ providedIn: 'root' })
export class CertifierService {
  constructor(private http: HttpClient, private _config: ConfigService) {}
  
  getAll(): Observable<CertifierDto[]> {
    return this.http.get<CertifierDto[]>(
      `${this._config.config.data}Certifier/GetAll`
    );
  }
  getById(id: number): Observable<CertifierDto> {
    return this.http.get<CertifierDto>(
      `${this._config.config.data}Certifier/GetById?id=${id}`
    );
  }
  getActives(): Observable<CertifierDto[]> {
    return this.http.get<CertifierDto[]>(
      `${this._config.config.data}Certifier/GetActives`
    );
  }
  create(model: CertifierDto): Observable<RequestResult> {
    return this.http.post<RequestResult>(
      `${this._config.config.data}Certifier/Create`,
      model
    );
  }
  update(model: CertifierDto): Observable<RequestResult> {
    return this.http.put<RequestResult>(
      `${this._config.config.data}Certifier/Update`,
      model
    );
  }
  disable(id: number): Observable<RequestResult> {
    return this.http.delete<RequestResult>(
      `${this._config.config.data}Certifier/Disable?id=${id}`
    );
  }
  enable(id: number): Observable<RequestResult> {
    return this.http.delete<RequestResult>(
      `${this._config.config.data}Certifier/Enable?id=${id}`
    );
  }
}
