export class RequestLogDto {
    id?: number;
    isActive: boolean;
  
    requestId: number;
    requestStatus: number;
    textLog: string;
  
    /**
     *
     */
    constructor(id?: number) {
      this.id = id;
      this.isActive = true;
    }
  }
  