import { AccountTransactionDtos } from './account-transaction-dtos';

export class AccountDto {
  id: number;
  accountTypeId: number;
  accountTypeText: string;
  isActive: boolean;
  accountNumber: string;
  totalCertificates: number;
  availableCertificates: number;
  accountFroms?: AccountTransactionDtos[] = [];
  accountTos?: AccountTransactionDtos[] = [];
  transactionsAll?: AccountTransactionDtos[] ;
  constructor() {
  }
}
