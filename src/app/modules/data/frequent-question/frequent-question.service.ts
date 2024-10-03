import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { FrequentQuestionDto } from './dtos/frequent-question-dtos';

@Injectable({
  providedIn: 'root'
})
export class FrequentquestionService {
  constructor(private http: HttpClient,
    private _config: ConfigService) { }
getAll(): Observable<FrequentQuestionDto[]> {
    return this.http.get<FrequentQuestionDto[]>(`${this._config.config.data}FrequentQuestion/GetAll`);
}
getById(id: number): Observable<FrequentQuestionDto> {
    return this.http.get<FrequentQuestionDto>(`${this._config.config.data}FrequentQuestion/GetById?id=${id}`)
}
getActives(): Observable<FrequentQuestionDto[]> {
    return this.http.get<FrequentQuestionDto[]>(`${this._config.config.data}FrequentQuestion/GetActives`);
}
create(model: FrequentQuestionDto): Observable<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}FrequentQuestion/Create`, model);
}
update(model: FrequentQuestionDto, id: number): Observable<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}FrequentQuestion/Update?id=${id}`, model);
}
disable(id: number): Observable<RequestResult> {
    return this.http.delete<RequestResult>(`${this._config.config.data}FrequentQuestion/Disable?id=${id}`);
}
enable(id: number): Observable<RequestResult> {
    return this.http.delete<RequestResult>(`${this._config.config.data}FrequentQuestion/Enable?id=${id}`);
}
}
