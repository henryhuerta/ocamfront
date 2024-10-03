export class RequestTypeDto {
  id: number;
  isActive: boolean;
  name: string;
  requestTypeDocuments: RequestTypeDocumentDto[];


  constructor(id?: number) {
    this.id = id ?? 0;
    this.isActive = true;
    this.requestTypeDocuments = [];
  }
}
export class RequestTypeDocumentDto {
  id: number;
  requestTypeId: number;
  documentTypeId: number;
  required?: boolean;
  description: string;
  multiple: boolean;
  enableInputPercent: boolean;
  lastUpdated: Date;
  isActive: boolean;

  extensionsAllowed: string;

  constructor(id?: number) {
    this.id = id ?? 0;
    this.lastUpdated = new Date();
    this.isActive = true;
     this.required = false;
     this.multiple = false;
     this.enableInputPercent = false;
     this.extensionsAllowed = "";
  }
}
