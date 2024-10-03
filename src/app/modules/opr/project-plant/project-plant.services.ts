import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { PlantOfProjectDto } from './dtos/plant-of-project-dto';

@Injectable({
    providedIn: 'root',
})
export class ProjectPlantService {
    constructor(private http: HttpClient, private _config: ConfigService) { }


    getTenantPlantOfProjects(): Observable<PlantOfProjectDto[]> {
        return this.http.get<PlantOfProjectDto[]>(
            `${this._config.config.data}ProjectPlant/GetPlantOfProjects`
        );
    }

}
