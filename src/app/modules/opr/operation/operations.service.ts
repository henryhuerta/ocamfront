import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { AccountDto } from '../account/dtos/account-dto';
import { TransferCertificateDto } from './transfer-certificates/dtos/transfer-certificates-dto';
import { AccountTransactionDto } from './common/dtos/account-transaction-dto';
import { ProjectRequestDto } from './dtos/project-request-dto';
import { ProjectPlantsSpotDto } from '../../data/spot-market/dtos/project-plants-spot-dto';
import { ProjectRequestSpotDto } from '../../data/spot-market/dtos/project-request-spot';

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  constructor(private http: HttpClient, private _config: ConfigService) { }

  createProject(formData: FormData
  ): Observable<RequestResult> {
    return this.http.post<RequestResult>(`${this._config.config.data}ProjectRequest/Create`, formData);
  }

  getProjectPlants(id: number): Observable<ProjectPlantsSpotDto[]> {
    return this.http.get<ProjectPlantsSpotDto[]>(
      `${this._config.config.data}ProjectPlant/GetProjectPlants?accountTypeId=${id}`
    );
  }
  getProjectPlantsGroupByAccountTypeId(id: number): Observable<ProjectRequestSpotDto[]> {
    return this.http.get<ProjectRequestSpotDto[]>(
      `${this._config.config.data}ProjectPlant/GetProjectPlantsGroupByAccountTypeId?accountTypeId=${id}`
    );
  }


  updateProjectPlantSpotCertificates(body: ProjectPlantsSpotDto[], accountTypeId: number): Observable<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.data}ProjectPlant/UpdateProjectPlantSpotCertificates?accountTypeId=${accountTypeId}`, body);
}
  getGroupedProjects(
    accountTypeId: number
  ): Observable<TransferCertificateDto[]> {
    return this.http.get<TransferCertificateDto[]>(
      `${this._config.config.data}ProjectPlant/GetGroupedProjectPlants?accountTypeId=${accountTypeId}`
    );
  }

  getAccountByNumberAccount(accountNumber: string): Observable<AccountDto> {
    return this.http.get<AccountDto>(
      `${this._config.config.data}Account/GetByAccountNumber?accountNumber=${accountNumber}`
    );
  }

  processTransaction(model: AccountTransactionDto): Observable<RequestResult> {
    return this.http.post<RequestResult>(
      `${this._config.config.data}AccountTransaction/Process`,
      model
    );
  }
}
