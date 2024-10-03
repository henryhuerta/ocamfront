import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppComponentBase } from '../../../../../_base/AppComponentBase';
import { ProjectPlanDTO } from '../../dtos/project-plant-dto';
import { ProjectPlanItem } from '../../transfer-certificates/dtos/transfer-certificates-dto';
import { ResumePlantProjectDto } from '../dtos/resume-plant-project-dto';
import { AccountDto } from '../../../account/dtos/account-dto';
import { AccountTransactionDto } from '../dtos/account-transaction-dto';

@Component({
  selector: 'app-resume-verification-plants',
  templateUrl: './resume-verification-plants.component.html',
})
export class ResumeVerificationPlantsComponent
  extends AppComponentBase
  implements OnInit {
  @Input() projectPlants: ProjectPlanDTO[] = [];
  @Input() account: AccountDto = new AccountDto();
  @Input() accountType: string = '';
  @Input() transactionType: string = '';
  @Input() certificatesToProcess: number = 0;
  @Input() transaction: AccountTransactionDto = new AccountTransactionDto();

  DxDataSource: ResumePlantProjectDto[] = [];
  columns: any[] = [];
  columnsCertificates: any[] = [];

  constructor(private datePipe: DatePipe) {
    super();
  }
  ngOnInit(): void {
    this.setColumns();
    this.setData();
    if (this.transactionType === 'redimir') {
      this.transformAccount();
    }

  }

  transformAccount() {
    this.account.accountNumber2 =
      this.account.accountNumber[0] +
      this.account.accountNumber[1] +
      this.account.accountNumber[2] +
      '-' +
      this.account.accountNumber[3] +
      this.account.accountNumber[4] +
      this.account.accountNumber[5] +
      '-' +
      this.account.accountNumber[6] +
      this.account.accountNumber[7] +
      this.account.accountNumber[8] +
      this.account.accountNumber[9];
  }

  setData() {
    if (this.isUndefinedOrNull(this.projectPlants)) {
      this.DxDataSource = [];
      return;
    }
    this.projectPlants.forEach((prj) => {
      let project = new ResumePlantProjectDto();

      let lastPosition: number =
        prj.certificatesToTransfer <= prj.projectPlantCertificates.length
          ? prj.certificatesToTransfer
          : prj.projectPlantCertificates.length;

      if (prj.projectPlantCertificates.length === 0) {
        project.certifierFrom = 'N/A';
        project.certifierTo = 'N/A';
      } else {
        let initialCertificateNumber =
          prj.projectPlantCertificates[0].certificateNumber;

        let finalCertificateNumber =
          prj.projectPlantCertificates[lastPosition - 1].certificateNumber;

        project.certifierFrom = initialCertificateNumber;
        project.certifierTo = finalCertificateNumber;
      }

      project.businessNameInstalation = prj.businessNameInstalation;
      project.startUpDate = prj.startUpDate
        ? this.datePipe.transform(prj.startUpDate, 'MMM-DD-yyyy')
        : '';
      project.techType = prj.techType;
      project.country = prj.country;
      project.productionPeriod =
        (prj.initPeriodDate
          ? this.datePipe.transform(prj.initPeriodDate, 'MMM-dd-yyyy')
          : '') +
        ' - ' +
        (prj.endPeriodDate
          ? this.datePipe.transform(prj.endPeriodDate, 'MMM-dd-yyyy')
          : '');
      project.certificatesToTransfer = prj.certificatesToTransfer;
      project.certificatesAvailable = lastPosition;
      this.DxDataSource.push(project);
    });
  }

  setColumns() {
    this.columns = [
      {
        dataField: 'country',
        caption: 'País de origen',
        allowEditing: false,
        alignment: 'left',
      },
      {
        dataField: 'businessNameInstalation',
        caption: 'Nombre de la Instalación',
        allowEditing: false,
        alignment: 'left',
      },
      {
        dataField: 'techType',
        caption: 'Tipo de Tecnología',
        allowEditing: false,
        alignment: 'left',
      },
      {
        dataField: 'startUpDate',
        dataType: 'date',
        caption: 'Fecha de puesta en marcha',
        allowEditing: false,
        alignment: 'left',
      },
    ];

    this.columnsCertificates = [
      {
        dataField: 'certifierFrom',
        caption: 'Certificados Desde',
        allowEditing: false,
        alignment: 'left',
        width: 300
      },
      {
        dataField: 'certifierTo',
        caption: 'Certificados Hasta',
        allowEditing: false,
        alignment: 'left',
        width: 300
      },
      {
        dataField: 'certificatesAvailable',
        caption: 'Número de Certificados',
        allowEditing: false,
        alignment: 'left',
      },
      {
        dataField: 'productionPeriod',
        caption: 'Periodo de Producción',
        allowEditing: false,
        alignment: 'left',
      },
    ];
  }
}
