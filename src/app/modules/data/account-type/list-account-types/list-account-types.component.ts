import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { AccountTypeService } from '../account-type.service';
import { CreateOrUpdateAccountTypeComponent } from '../create-or-update-account-type/create-or-update-account-type.component';
import { AccountTypeDto } from '../dtos/account-type-dto';

@Component({
  selector: 'app-list-account-types',
  templateUrl: './list-account-types.component.html',
  styleUrls: ['./list-account-types.component.scss'],
})
export class ListAccountTypesComponent
  extends AppComponentBase
  implements OnInit
{
  title: string = 'Tipos de Cuenta';

  columns: any[] = [];

  DataSource: AccountTypeDto[] = [];

  @ViewChild('createOrUpdateModal')
  createOrUpdateModal: CreateOrUpdateAccountTypeComponent;

  constructor(private _accountTypeService: AccountTypeService) {
    super();
  }

  ngOnInit(): void {
    this.getData();
    this.intializeColumns();
  }

  intializeColumns(): void {
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
        dataField: 'code',
        caption: 'Código',
        allowEditing: false,
      },
      {
        dataField: 'name',
        caption: 'Nombre',
        allowEditing: false,
      },
      {
        dataField: 'acceptTermsConditionRequired',
        caption: 'Condiciones Aceptadas Requeridas',
        cellTemplate: 'checkTemplate',
        allowEditing: false,
      },
    ];
  }

  getData() {
    this._accountTypeService.getAll().subscribe((res: AccountTypeDto[]) => {
      this.DataSource = res;
    });
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: AccountTypeDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(
    requestResult: RequestResult,
    item: AccountTypeDto
  ) {
    if (requestResult.success) {
      this.getData();
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: AccountTypeDto) {
    // let confirm = await this.confirm();
    // if (confirm.value) {
    let response_: RequestResult = new RequestResult();
    this._accountTypeService
      .disable(data.id)
      .subscribe((response_: RequestResult) => {
        response_ = response_;
        this.validResponseDisableEnableAction(response_, data);
      });

    // }
  }
  async enable(data: AccountTypeDto) {
    // let confirm = await this.confirm();
    // if (confirm.value) {
    let response_: RequestResult = new RequestResult();
    this._accountTypeService
      .enable(data.id)
      .subscribe((response_: RequestResult) => {
        response_ = response_;
        this.validResponseDisableEnableAction(response_, data);
      });

    // }
  }
}
