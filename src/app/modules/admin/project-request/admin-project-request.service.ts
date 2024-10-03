import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { RequestResult } from '../../../_base/models/RequestResult';
import { ProjectRequest } from './dtos/project-request';
import { ProjectRequestDocumentDto } from './dtos/project-request-document';
import { RejectProjectRequestDto } from './dtos/reject-project-request-dto';

@Injectable({
  providedIn: 'root',
})
export class AdminProjectRequestService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  constructor(private http: HttpClient, private _config: ConfigService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();

  }

  getDocsById(id: number): Observable<ProjectRequestDocumentDto[]> {
    return this.http.get<ProjectRequestDocumentDto[]>(
      `${this._config.config.data}ProjectRequest/GetDocsById?id=${id}`
    );
  }

  getActives(): Observable<ProjectRequest[]> {
    this.isLoadingSubject.next(true);
    return this.http.get<ProjectRequest[]>(
      `${this._config.config.data}ProjectRequest/GetActives`
    ).pipe(
      tap(() => { this.isLoadingSubject.next(false) })
    );
  }

  getAll(): Observable<ProjectRequest[]> {
    return this.http.get<ProjectRequest[]>(
      `${this._config.config.data}ProjectRequest/GetAll`
    );
  }

  getById(id: number): Observable<ProjectRequest> {
    return this.http.get<ProjectRequest>(
      `${this._config.config.data}ProjectRequest/GetById?id=${id}`
    );
  }

  reject(model: RejectProjectRequestDto): Observable<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}ProjectRequest/Reject`, model);
  }

  approve(id: number): Observable<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}ProjectRequest/Approve`, id);
  }
}
