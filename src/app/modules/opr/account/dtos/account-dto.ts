export class AccountDto {
  id: number;
  accountTypeId: number;
  accountNumber: string;
  accountNumber2: string;
  beneficiary: string;
  totalCertificates: number;
  availableCertificates: number;

  accountTos: AccountTransactionDto[];
  accountFroms: AccountTransactionDto[];
  isActive: boolean;

  constructor(id?: number) {
    this.id = id ?? 0;
    this.beneficiary="";
  }
}

export class AccountTransactionDto {
  id: number;
  accountFromId: number;
  transactionNumber: string;
  textLog: string;
  transferType: number;
  transactionType: number;
  transactionDateTime: Date;
  transactionQuantity: number;
  accountToId: number;
  beneficiary: string;
  beneficiaryEmail: string;
  beneficiaryAddress: string;
  beneficiaryMinDate: Date;
  beneficiaryMaxDate: Date;

  accountTransactionDetails: AccountTransactionDetailDto[];

  constructor(id?: number) {
    this.id = id ?? 0;
    this.accountTransactionDetails = [];
  }
}

export class AccountTransactionDetailDto {
  id: number;

  accountTransactionId: number;
  projectPlantId: number;
  transactionQuantity: number;

  constructor(id?: number) {
    this.id = id ?? 0;
  }
}
