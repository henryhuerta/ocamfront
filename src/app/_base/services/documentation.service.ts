import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentationDto } from 'src/app/shared/models/documentation-dto';
import { ConfigService } from './ConfigService';

@Injectable({ providedIn: 'root' })
export class DocumentationService {
    constructor(private http: HttpClient,
        private _config: ConfigService) { }

    getDocuments(tenantId: number,
        entityId: number,
        entity: string
    ): Observable<DocumentationDto[]> {
        return this
            .http
            .get<DocumentationDto[]>
            (`${this._config.config.document}Attachment/GetAttachmentByTenant?idTenant=${tenantId}&key=${entityId}&entity=${entity}&loadData=false`);
    }

}
