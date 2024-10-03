import { AccountService } from './../account.service';
import { AccountTransactionDtos } from './../dtos/account-transaction-dtos';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { OptionButton } from 'src/app/shared/models/option-button';
import { ModalWithOptionButtonsComponent } from 'src/app/shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { AccountDto } from '../dtos/account-dtos';
import { AuthenticationService } from 'src/app/_base/services/authentication.service';
import { ConfigService } from 'src/app/_base/services/ConfigService';

@Component({
  selector: 'app-account-transaction-history',
  templateUrl: './account-transaction-history.component.html',
  styleUrls: [],
})
export class AccountTransactionHistoryComponent
  extends AppComponentBase
  implements OnInit {
  Model: AccountDto = new AccountDto();
  Transactions: AccountTransactionDtos[] = [];

  OptionButtons: OptionButton[];
  title: string = 'Historial de Transacciones';
  errors: any = {};

  @ViewChild('entityComponent')
  entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  @Input() accounts: AccountDto[];

  constructor(
    private _AccountService: AccountService,
    private _configService: ConfigService,
    private _authService: AuthenticationService
  ) {
    super();
  }
  public get data(): AccountDto[] {
    return this.accounts;
  }
  ngOnInit(): void {
    this.initializeView();
  }
  getData() {
    this._AccountService.getAll().subscribe((result: AccountDto[]) => {
      this.accounts = result;
    });
  }
  async initializeView() {
    this.errors = {};
  }

  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    this.OptionButtons = [
      new OptionButton(
        'close',
        'Cerrar',
        'btn btn-danger pull-right',
        'fa fa-times'
      ),
    ];
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case 'close':
        this.close();
        break;
    }
  }

  close() {
    this.entityComponent.close();
  }

  async showTransaction(data: AccountDto) {
    await this.initializeView();
    this.setButtonOptions();
    this._AccountService
      .getHistoryByAccountId(data.id)
      .subscribe((result: AccountTransactionDtos[]) => {
        this.Transactions = result;
      });
    this.Model = data;
    this.entityComponent.show();
    // this.getData();
  }

  printTransaction(transactionNumber: string, transactionType: string) {
    let serviceToCall =
      transactionType == 'Redencion'
        ? 'PrintRedeemCertificate'
        : transactionType == 'Cancelacion'
          ? 'PrintCancellationCertificate'
          : 'PrintTransfer';
    window.open(
      `${this._configService.config.report}AccountTransactions/${serviceToCall}?transactionNumber=${transactionNumber}&token=${this._authService.currentUserValue.tenantId}`,
      '_blank'
    );
  }
}
