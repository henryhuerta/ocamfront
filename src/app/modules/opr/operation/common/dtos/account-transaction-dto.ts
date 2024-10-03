export class AccountTransactionDto {
  id?: number;
  isActive?: boolean;

  accountFromId?: number;
  accountTypeId?: number;
  accountFrom?: string;
  transactionNumber?: string;
  transferType: number;
  transactionType: number;
  transactionDateTime: Date;
  transactionQuantity: number;
  accountToId?: number;
  accountTo?: string;
  beneficiary: string;
  beneficiaryEmail: string;
  beneficiaryAddress: string;
  textLog: string;
  beneficiaryMinDate: Date;
  beneficiaryMaxDate: Date;
  accountTransactionDetails: AccountTransactionDetailDto[];

  constructor(id?: number) {
    this.id = id ?? 0;
    this.accountTransactionDetails = [];
    this.isActive = true;
    this.beneficiary = '';
    this.beneficiaryEmail = '';
    this.beneficiaryAddress = '';
    this.beneficiaryMinDate = new Date();
    this.beneficiaryMaxDate = new Date();
    this.textLog = ""
  }
}

export class AccountTransactionDetailDto {
  id: number;
  isActive: boolean;

  accountTransactionId?: number;
  projectPlantId?: number;
  transactionQuantity: number;

  constructor(id?: number) {
    this.id = id ?? 0;
    this.isActive = true;
    this.transactionQuantity = 0;
  }
}
