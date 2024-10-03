import { RequestDocumentDto } from './request-documents';
import { RequestLogDto } from './request-log-dto';

export class RequestDTO {
  id: number;
  requestTypeId: number;
  requestType: string;
  percent: number;

  isActive: boolean;
  requesterName: string;

  log: RequestLogDto;
  requestDocuments: RequestDocumentDto[];
  /**
   *
   */
  constructor(id?: number) {
    this.id = id ?? 0;
    this.requestDocuments = [];
  }
}
