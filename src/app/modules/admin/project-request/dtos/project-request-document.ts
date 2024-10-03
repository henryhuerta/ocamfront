export class ProjectRequestDocumentDto {
  id?: number;
  isActive: boolean;

  projectRequestId: number;
  documentTypeId: number;
  documentType: string;
  lastUpdated: Date;

  fileName: string;
  extension: string;
  length: number;

  icon: string;
  textClass: string;

  /**
   *
   */
  constructor(id?: number) {
    this.id = id;

    this.lastUpdated = new Date();
    this.isActive = true;
  }
}
