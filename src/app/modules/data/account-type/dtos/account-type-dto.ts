export class AccountTypeDto {
  id: number;

  code: string;
  name: string;
  acceptTermsConditionRequired: boolean;
  accountTypeRequirements: AccountTypeRequirementDto[];
  accountTypeDocuments: AccountTypeDocumentDto[];

  isActive: boolean;

  /**
   *
   */
  constructor(id?: number) {
    this.id = id ?? 0;
    this.isActive = true;
    this.accountTypeRequirements = [];
    this.accountTypeDocuments = [];
    this.acceptTermsConditionRequired = false;
  }
}

export class AccountTypeDocumentDto {
  id: number;

  required: boolean;
  description: string;
  lastUpdated: Date;
  documentTypeId: number;
  documentTypeName: string;

  isActive: boolean;

  /**
   *
   */
  constructor(id?: number) {
    this.id = id ?? 0;
    this.lastUpdated = new Date();
    this.isActive = true;
    this.required = false;
  }
}

export class AccountTypeRequirementDto {
  id: number;

  requirement: string;

  isActive: boolean;

  /**
   *
   */
  constructor(id?: number) {
    this.id = id ?? 0;
    this.isActive = true;
  }
}
