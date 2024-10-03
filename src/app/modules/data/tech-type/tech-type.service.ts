import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { TechTypeDto } from './dtos/tech-type-dtos';

@Injectable({ providedIn: 'root' })
export class TechtypeService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }
    getAll(): Observable<TechTypeDto[]> {
        return this.http.get<TechTypeDto[]>(`${this._config.config.data}TechType/GetAll`);
    }
    getById(id: number): Observable<TechTypeDto> {
        return this.http.get<TechTypeDto>(`${this._config.config.data}TechType/GetById?id=${id}`)
    }
    getActives(): Observable<TechTypeDto[]> {
        return this.http.get<TechTypeDto[]>(`${this._config.config.data}TechType/GetActives`);
    }
    create(model: TechTypeDto): Observable<RequestResult> {
        return this.http.post<RequestResult>(`${this._config.config.data}TechType/Create`, model);
    }
    update(model: TechTypeDto, id: number): Observable<RequestResult> {
        return this.http.put<RequestResult>(`${this._config.config.data}TechType/Update?id=${id}`, model);
    }
    disable(id: number): Observable<RequestResult> {
        return this.http.delete<RequestResult>(`${this._config.config.data}TechType/Disable?id=${id}`);
    }
    enable(id: number): Observable<RequestResult> {
        return this.http.delete<RequestResult>(`${this._config.config.data}TechType/Enable?id=${id}`);
    }
}
