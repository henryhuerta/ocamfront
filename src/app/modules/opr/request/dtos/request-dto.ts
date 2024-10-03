export class RequestDTO {
  id: number;
  requestTypeId: number;
  requestStatus: number;
  isActive: boolean;
  percent: number;
  requesterName: string;
  requestDocuments: RequestDocument[];
  /**
   *
   */
  constructor(id?: number) {
    this.id = id ?? 0;
    this.isActive = true;
    this.percent = 0;
    this.requestStatus = 1;
    this.requestDocuments = [];
  }
}

export class RequestDocument {
  id: number;
  requestId: number;
  documentTypeId: number;
  document: File;
  /**
   *
   */
  constructor(id?: number) {
    this.id = id ?? 0;
  }
}
