import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { DefinitionValuesDto } from './dtos/definition-values-dto';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {

  constructor(private http: HttpClient, private _config: ConfigService) {}

  getProjectStatusTypes(): Observable<DefinitionValuesDto[]> {
    return this.http.get<DefinitionValuesDto[]>(
      `${this._config.config.data}EnumDefinition/GetProjectStatusTypes`
    );
  }
}
