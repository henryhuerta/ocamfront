export class ProjectRequestDto {
  id?: number;
  requester: string;
  company: string;
  projectStatusValue: string;
  accountTypeId: number;
  projectStatus: number;
  documents: FormData[];
  isActive: boolean;
  /**
   *
   */
  constructor(id?: number) {
    this.id = id;
    this.projectStatus = 1;
    this.isActive = true;
  }

}

export class ProjectDocument {
  id?: number;
  isActive: boolean;
  projectRequestId: number;
  documentTypeId: number;
  lastUpdated: Date;

  document: FormData;
  /**
   *
   */
  constructor(id?: number) {
    this.isActive = true;
    this.lastUpdated = new Date();
    this.document = new FormData();
  }
}
