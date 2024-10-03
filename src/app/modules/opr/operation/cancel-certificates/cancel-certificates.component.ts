import { Component, OnInit } from '@angular/core';
import { AccountTypeService } from 'src/app/modules/data/account-type/account-type.service';
import { AccountTypeDto } from 'src/app/modules/data/account-type/dtos/account-type-dto';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { ProjectPlanDTO } from '../dtos/project-plant-dto';
import { OperationsService } from '../operations.service';
import { TransferCertificateDto } from '../transfer-certificates/dtos/transfer-certificates-dto';
import DataGrid from 'devextreme/ui/data_grid';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import {
  AccountTransactionDetailDto,
  AccountTransactionDto,
} from '../common/dtos/account-transaction-dto';
import { AccountDto } from '../../account/dtos/account-dto';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-cancel-certificates',
  templateUrl: './cancel-certificates.component.html',
  styleUrls: ['./cancel-certificates.component.scss'],
})
export class CancelCertificatesComponent
  extends AppComponentBase
  implements OnInit
{
  Model: AccountTransactionDto = new AccountTransactionDto();
  errors: any = {};
  proccessErrors: any = {};
  errorsAccount: any = {};
  errorsAccountACH: any = {};
  columns: any[] = [];
  columnsDetail: any[] = [];
  rulesAccount: any;

  Account: AccountDto = new AccountDto();

  DataSource: TransferCertificateDto[] = [];
  DxAccountTypes: AccountTypeDto[] = [];
  projectPlants: ProjectPlanDTO[] = [];
  accountType: AccountTypeDto = new AccountTypeDto();

  dataGridView: DataGrid;
  dataDetailGridView: DataGrid;

  TotalCertificatesAvailable: number = 0;
  TotalCertificatesToRedeem: number = 0;

  hasOcamAccount: boolean | undefined = undefined;
  accepterToRedeem: boolean = false;
  proceedToAssignAccount: boolean = false;
  verifyDataToRedeem: boolean = false;

  showAlert: boolean = false;
  transactionSuccess: boolean = false;

  constructor(
    private operationsService: OperationsService,
    private accountTypeService: AccountTypeService,
    private accountService: AccountService
  ) {
    super();
  }

  ngOnInit(): void {
    this.rulesAccount = { X: /[02-9]/ };
    this.Model.transactionType = 2;
    this.Model.transferType = 0;
    this.setColumns();
    this.getAccountTypes();
  }

  setColumns() {
    this.columns = [
      {
        dataField: 'country',
        caption: 'País',
        allowEditing: false,
        alignment: 'left',
      },
      {
        dataField: 'techType',
        caption: 'Tecnología',
        allowEditing: false,
        alignment: 'left',
      },
      {
        dataField: 'year',
        caption: 'Año',
        allowEditing: false,
        alignment: 'left',
      },
      {
        dataField: 'certificatesAvailable',
        caption: 'Certificados Disponibles',
        allowEditing: false,
        alignment: 'left',
      },
      {
        dataField: 'certificatesToTransfer',
        dataType: 'number',
        caption: 'Certificados a cancelar',
        allowEditing: false,
        alignment: 'left',
      },
    ];

    this.columnsDetail = [
      {
        dataField: 'businessNameInstalation',
        caption: 'Planta',
        allowEditing: false,
        alignment: 'left',
      },
      {
        dataField: 'nameInstalation',
        caption: 'Planta',
        allowEditing: false,
        alignment: 'left',
      },
      {
        dataField: 'certificatesAvailable',
        caption: 'Certificados Disponibles',
        allowEditing: false,
        alignment: 'left',
      },
      {
        dataField: 'certificatesToTransfer',
        dataType: 'number',
        caption: 'Certificados a cancelar',
        allowEditing: true,
        alignment: 'left',
        cellTemplate: 'toTransferTemplate'
      },
    ];
  }

  getAccountTypes() {
    this.accountTypeService.getActives().subscribe((res: AccountTypeDto[]) => {
      this.DxAccountTypes = res;
    });
  }

  getProjects(accountTypeId: number) {
    this.operationsService
      .getGroupedProjects(accountTypeId)
      .subscribe((res: TransferCertificateDto[]) => {
        this.DataSource = res;
        let totalToShow = 0;
        for (let item of this.DataSource) {
          totalToShow += item.certificatesAvailable;
        }
        this.TotalCertificatesAvailable = totalToShow;
      });
  }

  getAccountTypeById(id: number) {
    this.accountTypeService.getById(id).subscribe((res: AccountTypeDto) => {
      this.accountType = res;

      if (res.id && res.id > 0) {
        this.getProjects(res.id);
      }
    });
  }

  setAccountNumber(event: any) {
    this.Account.accountNumber = event.event.target.value;
  }

  getAccountData(event: any) {
    if (this.hasOcamAccount === false) {
      this.errorsAccount = {};
      return;
    }
    this.accountService
      .getAccountByNumberAccount(
        this.Account.accountNumber,
        this.accountType.id
      )
      .subscribe((res: AccountDto) => {
        if (this.isUndefinedOrNull(res) || !(res.id > 0)) {
          this.errorsAccount = {
            beneficiary: ['NO EXISTE CUENTA'],
          };
        } else {
          this.Account = res;
          this.Account.accountNumber2 = event.event.target.value;
          this.errorsAccount = {};
        }
      });
  }

  onChangedDataSource(dataGrid: any) {}

  onChangedSelectionDetailDataSource(event: any) {
    let currentDataGrid = event.component;
    let dataSource = currentDataGrid.getDataSource();
    let currentSelectedItems = event.selectedRowsData;

    currentSelectedItems.forEach((element: any) => {
      let existingInPlants = this.projectPlants.findIndex(
        (x) => x.id === element.id
      );

      if (existingInPlants < 0) {
        this.projectPlants.push(element);
      }
    });

    let copyProjectPlants = this.projectPlants.slice(0);

    copyProjectPlants.forEach((project) => {
      let itemBelongsInCurrentDataSource = dataSource._items.find(
        (x: any) => x.id === project.id
      );

      if (!this.isUndefinedOrNull(itemBelongsInCurrentDataSource)) {
        let isSelected = currentSelectedItems.find(
          (x: any) => x.id === itemBelongsInCurrentDataSource.id
        );

        if (this.isUndefinedOrNull(isSelected)) {
          let index = this.projectPlants.findIndex((x) => x.id === project.id);

          if (index >= 0) {
            this.projectPlants.splice(index, 1);
          }
        }
      }
    });

    let total = 0;
    this.projectPlants.forEach((plant) => {
      total += plant.certificatesToTransfer;
    });

    this.TotalCertificatesToRedeem = total;
  }

  onChangedDetailDataSource(dataGrid: any) {
    let currentItemChanged = dataGrid.data;

    this.DataSource.forEach((group) => {
      let totalCertificatesByGroup = 0;

      group.projectPlants.forEach((plant) => {
        if (
          plant.id === currentItemChanged.id &&
          plant.certificatesToTransfer <=
            currentItemChanged.certificatesToTransfer
        ) {
          plant.certificatesToTransfer =
            currentItemChanged.certificatesToTransfer;
        }
        totalCertificatesByGroup += plant.certificatesToTransfer;
      });
      group.certificatesToTransfer = totalCertificatesByGroup;
    });
  }

  continueProcess(processId: string) {
    switch (processId) {
      case 'acceptedToRedeem':
        this.accept();
        break;
      case 'assignAccountToRedeem':
        this.goToAssignAccountToRedeem();
        break;
      case 'verifyData':
        this.verifyData();
        break;
      case 'save':
        this.save();
        break;
    }
  }

  cancelTransfer() {
    this.accepterToRedeem = false;
    this.proceedToAssignAccount = false;
    this.verifyDataToRedeem = false;

    this.TotalCertificatesToRedeem = 0;

    this.resetDataSource();
  }

  resetDataSource() {
    this.DataSource.forEach((parent) => {
      parent.certificatesToTransfer = 0;
      parent.projectPlants.forEach((child) => {
        child.certificatesToTransfer = 0;
      });
    });
  }

  accept() {
    if (this.TotalCertificatesToRedeem === 0) {
      this.proccessErrors = {
        totalRedeem: ['EL TOTAL A CANCELAR DEBE SER MAYOR A CERO'],
      };
      return;
    }


    let moreThanAvailable = this.projectPlants.find(
      (x) => x.certificatesToTransfer > x.certificatesAvailable
    );

    if (!this.isUndefinedOrNull(moreThanAvailable)) {
      this.proccessErrors = {
        notAvailable: [
          'NO SE ES PERMITIDO CANCELAR MAS DE LO DISPONIBLE',
        ],
      };
      return;
    }

    let plantTransferCertificateNone = this.projectPlants.find(
      (x) => x.certificatesToTransfer <= 0
    );

    if (!this.isUndefinedOrNull(plantTransferCertificateNone)) {
      this.proccessErrors = {
        projectSelected: [
          'LOS PROYECTOS SELECCIONADOS DEBEN CANCELAR UNA CANTIDAD MAYOR A CERO',
        ],
      };
      return;
    }

    this.proccessErrors = {};

    this.accepterToRedeem = true;
    this.proceedToAssignAccount = false;
    this.verifyDataToRedeem = false;
  }

  goToAssignAccountToRedeem() {
    this.accepterToRedeem = false;
    this.proceedToAssignAccount = true;
    this.verifyDataToRedeem = false;
  }

  verifyData() {
    if (this.isEmptyOrNullString(this.Model.textLog)) {
      return;
    }
    this.accepterToRedeem = false;
    this.proceedToAssignAccount = false;
    this.verifyDataToRedeem = true;
  }

  finishProcess() {
    this.DataSource = [];
    this.Account = new AccountDto();
    this.accountType = new AccountTypeDto();

    this.errors = {};
    this.proccessErrors = {};
    this.errorsAccount = {};
    this.TotalCertificatesAvailable = 0;
    this.TotalCertificatesToRedeem = 0;
    this.accepterToRedeem = false;
    this.proceedToAssignAccount = false;
    this.verifyDataToRedeem = false;
    this.showAlert = false;
    this.transactionSuccess = false;
    this.Model = new AccountTransactionDto();
    this.Model.transactionType = 2;
    this.Model.transferType = 0;
  }

  save() {
    this.Model.accountTypeId = this.accountType.id;
    this.Model.accountToId = this.Account.id;
    this.Model.transactionType = 2;
    this.Model.transactionQuantity = this.TotalCertificatesToRedeem;

    if (this.Model.transferType === 1) {
      this.Model.accountToId = this.Account.id;
    } else {
      this.Model.accountToId = 0;
    }

    this.projectPlants.forEach((prj) => {
      let detail = new AccountTransactionDetailDto();
      detail.projectPlantId = prj.id;
      detail.transactionQuantity = prj.certificatesToTransfer;
      this.Model.accountTransactionDetails.push(detail);
    });
    this.operationsService
      .processTransaction(this.Model)
      .subscribe((response: RequestResult) => {
        debugger;
        this.validResponse(response);
      });
  }

  validResponse(requestResult: RequestResult) {
    debugger;
    if (requestResult.success) {
      ///this.success(requestResult.title, requestResult.messageResponse);
      this.transactionSuccess = true;
      this.showAlert = true;
      this.verifyDataToRedeem = false;
    } else {
      this.error(requestResult.title, requestResult.messageResponse);
      this.errors = requestResult.errors;
      this.transactionSuccess = false;
      this.showAlert = true;
      this.verifyDataToRedeem = false;
    }
  }
}
