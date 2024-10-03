import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { CertifierService } from '../certifier.service';
import { CreateOrUpdateCertifierComponent } from '../create-or-update-certifier/create-or-update-certifier.component';
import { CertifierDto } from '../dtos/certifier-dto';

@Component({
  selector: 'app-list-certifier',
  templateUrl: './list-certifier.component.html',
})
export class ListCertifierComponent extends AppComponentBase implements OnInit {
  title: string = 'Certificadoras';

  columns: any[] = [];
  GridData: CertifierDto[] = [];

  DataSourceCertifiers: CertifierDto[] = [];

  @ViewChild('createOrUpdateModal')
  createOrUpdateModal: CreateOrUpdateCertifierComponent;

  constructor(private _certifierService: CertifierService) {
    super();
  }

  setColumns() {
    this.columns = [
      {
        dataField: 'id',
        caption: 'Acciones',
        allowEditing: false,
        width: '120',
        cellTemplate: 'actionTemplate',
        alignment: 'center',
        allowExporting: true,
      },
      {
        dataField: 'name',
        caption: 'Nombre',
        allowEditing: false,
      },
      {
        dataField: 'contact',
        caption: 'Contacto',
        allowEditing: false,
      },
      {
        dataField: 'contactPhoneNumber',
        caption: 'Número de teléfono',
        allowEditing: false,
      },
      {
        dataField: 'contactEmail',
        caption: 'Correo',
        allowEditing: false,
      },
      // {
      //   dataField: "textBox",
      //   caption: "Name",
      //   allowEditing: false
      // },
      // {
      //   dataField: "isActive",
      //   caption: "Status",
      //   allowEditing: false,
      //   width: "120",
      //   alignment: "center",
      //   cellTemplate: "statusTemplate",
      //   calculateDisplayValue: (value: boolean) => value ? "ACTIVE" : "INACTIVE"
      // }
    ];
  }

  setMock() {}

  getCertifiers() {
    this._certifierService.getAll().subscribe((res: CertifierDto[]) => {
      debugger;
      this.DataSourceCertifiers = res;
    });
  }

  ngOnInit() {
    this.setColumns();
    // this.getGridData();

    this.getCertifiers();
  }

  getGridData() {
    this.setMock();
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: CertifierDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(
    requestResult: RequestResult,
    item: CertifierDto
  ) {
    if (requestResult.success) {
      debugger;
      this.getCertifiers();
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: CertifierDto) {
    // let confirm = await this.confirm();
    // if (confirm.value) {
    let response_: RequestResult = new RequestResult();
    this._certifierService
      .disable(data.id)
      .subscribe((response_: RequestResult) => {
        response_ = response_;
        this.validResponseDisableEnableAction(response_, data);
      });

    // }
  }
  async enable(data: CertifierDto) {
    // let confirm = await this.confirm();
    // if (confirm.value) {
    let response_: RequestResult = new RequestResult();
    this._certifierService
      .enable(data.id)
      .subscribe((response_: RequestResult) => {
        response_ = response_;
        this.validResponseDisableEnableAction(response_, data);
      });

    // }
  }
}
