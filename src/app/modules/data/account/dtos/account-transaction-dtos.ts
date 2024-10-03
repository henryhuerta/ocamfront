export class AccountTransactionDtos {
  accountFromId: number;
  transactionNumber: string;
  transactionDateTime: Date;
  transactionQuantity: number;
  accountToId?: number;
  beneficiary: string;
  beneficiaryEmail: string;
  beneficiaryAddress: string;
  beneficiaryMinDate: Date;
  beneficiaryMaxDate: Date;
  transactionType: AccountTransactionType;
  transactionTypeValue: string;
  subtract: boolean;
  accountNumber: string;
  constructor() {
  }
}

export enum AccountTransactionType {
  Transferencia = 1,
  Cancelacion = 2,
  Redencion = 3
}
