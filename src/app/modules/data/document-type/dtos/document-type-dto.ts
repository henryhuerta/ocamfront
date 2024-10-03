import { DocumentExtensionDto } from './document-extension-dto';

export class DocumentTypeDto {
  id: number;
  code: string;
  name: string;
  maxLength: number;

  documentTypeExtensions: DocumentExtensionDto[];

  isActive: boolean;

  extensionsAllowed: string;

  /**
   *
   */
  constructor(id?: number) {
    this.id = id ?? 0;
    this.documentTypeExtensions = [];
    this.extensionsAllowed = "";
  }
}
