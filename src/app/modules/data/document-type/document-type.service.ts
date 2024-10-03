import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { DocumentTypeDto } from './dtos/document-type-dto';
import { DocumentTypeFilterDto } from './dtos/document-type-filter';

@Injectable({
  providedIn: 'root',
})
export class DocumentTypeService {
  constructor(private http: HttpClient, private _config: ConfigService) { }

  getAll(): Observable<DocumentTypeDto[]> {
    return this.http.get<DocumentTypeDto[]>(
      `${this._config.config.data}DocumentType/GetAll`
    );
  }
  getById(id: number): Observable<DocumentTypeDto> {
    return this.http.get<DocumentTypeDto>(
      `${this._config.config.data}DocumentType/GetById?id=${id}`
    );
  }
  getActives(): Observable<DocumentTypeDto[]> {
    return this.http.get<DocumentTypeDto[]>(
      `${this._config.config.data}DocumentType/GetActives`
    );
  }
  getByFilterIds(
    filterModel: DocumentTypeFilterDto
  ): Observable<DocumentTypeDto[]> {
    return this.http.post<DocumentTypeDto[]>(
      `${this._config.config.data}DocumentType/GetByFilterIds`,
      filterModel
    );
  }
  create(model: DocumentTypeDto): Observable<RequestResult> {
    return this.http.post<RequestResult>(
      `${this._config.config.data}DocumentType/Create`,
      model
    );
  }
  update(model: DocumentTypeDto): Observable<RequestResult> {
    return this.http.put<RequestResult>(
      `${this._config.config.data}DocumentType/Update`,
      model
    );
  }
  disable(id: number): Observable<RequestResult> {
    return this.http.delete<RequestResult>(
      `${this._config.config.data}DocumentType/Disable?id=${id}`
    );
  }
  enable(id: number): Observable<RequestResult> {
    return this.http.delete<RequestResult>(
      `${this._config.config.data}DocumentType/Enable?id=${id}`
    );
  }
}
