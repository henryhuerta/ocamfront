import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { CountryDto } from './dtos/country-dto';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient, private _config: ConfigService) {}

  getCountries(): Observable<CountryDto[]> {
    return this.http.get<CountryDto[]>(
      `${this._config.config.data}Country/GetAll`
    );
  }
}
