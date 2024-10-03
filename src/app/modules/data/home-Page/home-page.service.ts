import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/_base/services/ConfigService';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  constructor(private http: HttpClient,
    private _config: ConfigService) { }
}
