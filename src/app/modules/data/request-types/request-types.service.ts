import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { RequestTypeDto } from './dtos/request-type-dtos';

@Injectable({
  providedIn: 'root'
})
export class RequestTypesService {
  constructor(private http: HttpClient,
    private _config: ConfigService) { }
getAll(): Observable<RequestTypeDto[]> {
    return this.http.get<RequestTypeDto[]>(`${this._config.config.data}RequestType/GetAll`);
}
getById(id: number): Observable<RequestTypeDto> {
    return this.http.get<RequestTypeDto>(`${this._config.config.data}RequestType/GetById?id=${id}`)
}
getActives(): Observable<RequestTypeDto[]> {
    return this.http.get<RequestTypeDto[]>(`${this._config.config.data}RequestType/GetActives`);
}
create(model: RequestTypeDto): Observable<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}RequestType/Create`, model);
}
update(model: RequestTypeDto, id: number): Observable<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}RequestType/Update?id=${id}`, model);
}
disable(id: number): Observable<RequestResult> {
    return this.http.delete<RequestResult>(`${this._config.config.data}RequestType/Disable?id=${id}`);
}
enable(id: number): Observable<RequestResult> {
    return this.http.delete<RequestResult>(`${this._config.config.data}RequestType/Enable?id=${id}`);
}
}
