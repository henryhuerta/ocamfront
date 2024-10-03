export class ProjectRequestLogDto {
  id?: number;
  isActive: boolean;

  projectRequestId: number;
  projectStatus: number;
  textLog: string;

  /**
   *
   */
  constructor(id?: number) {
    this.id = id;
    this.isActive = true;
  }
}
