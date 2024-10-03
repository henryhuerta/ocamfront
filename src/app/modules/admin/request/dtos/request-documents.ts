export class RequestDocumentDto {
    id?: number;
    isActive: boolean;
  
    requestId: number;
    documentTypeId: number;
    lastUpdated: Date;
  
    fileName: string;
    extension: string;
    length: number;
  
    /**
     *
     */
    constructor(id?: number) {
      this.id = id;
  
      this.lastUpdated = new Date();
      this.isActive = true;
    }
  }
  