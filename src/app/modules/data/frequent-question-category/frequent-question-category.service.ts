import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { FrequentQuestionCategoryDto } from './dtos/frequent-question-category-dtos';

@Injectable({
  providedIn: 'root'
})
export class FrequentquestioncategoryService {
  constructor(private http: HttpClient,
    private _config: ConfigService) { }
getFrequentQuestionCategoryByFrequentQuestion(): Observable<FrequentQuestionCategoryDto[]> {
      return this.http.get<FrequentQuestionCategoryDto[]>(`${this._config.config.data}FrequentQuestionCategory/GetFrequentQuestionCategoriesByFrequentQuestion`);
}
getAll(): Observable<FrequentQuestionCategoryDto[]> {
    return this.http.get<FrequentQuestionCategoryDto[]>(`${this._config.config.data}FrequentQuestionCategory/GetAll`);
}
getById(id: number): Observable<FrequentQuestionCategoryDto> {
    return this.http.get<FrequentQuestionCategoryDto>(`${this._config.config.data}FrequentQuestionCategory/GetById?id=${id}`)
}
getActives(): Observable<FrequentQuestionCategoryDto[]> {
    return this.http.get<FrequentQuestionCategoryDto[]>(`${this._config.config.data}FrequentQuestionCategory/GetActives`);
}
create(model: FrequentQuestionCategoryDto): Observable<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}FrequentQuestionCategory/Create`, model);
}
update(model: FrequentQuestionCategoryDto, id: number): Observable<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}FrequentQuestionCategory/Update?id=${id}`, model);
}
disable(id: number): Observable<RequestResult> {
    return this.http.delete<RequestResult>(`${this._config.config.data}FrequentQuestionCategory/Disable?id=${id}`);
}
enable(id: number): Observable<RequestResult> {
    return this.http.delete<RequestResult>(`${this._config.config.data}FrequentQuestionCategory/Enable?id=${id}`);
}
}
