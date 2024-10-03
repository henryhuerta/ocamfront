export class DocumentExtensionDto {
  id: number;
  documentTypeId: number;
  extensionType: string;

  isActive: boolean;

  /**
   *
   */
  constructor(id?: number) {
    this.id = id ?? 0;
    this.isActive = true;
  }
}
