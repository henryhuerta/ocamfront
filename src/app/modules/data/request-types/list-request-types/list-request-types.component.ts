import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { CreateOrUpdateRequestTypesComponent } from '../create-or-update-request-types/create-or-update-request-types.component';
import { RequestTypeDto } from '../dtos/request-type-dtos';
import { RequestTypesService } from '../request-types.service';

@Component({
  selector: 'app-list-request-types',
  templateUrl: './list-request-types.component.html',
  styleUrls: []
})
export class ListRequestTypesComponent extends AppComponentBase implements OnInit {
  title: string = "Tipos de solicitudes";

  columns: any[] = [];
  GridData: RequestTypeDto[] = [];

  public get data (){
    return this.GridData;
  }

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateRequestTypesComponent;

  constructor(
    private _RequestTypesService: RequestTypesService
  ) {
    super();
  }

  setColumns() {
    this.columns = [
      {
        dataField: "id",
        caption: "Acciones",
        allowEditing: false,
        width: "120",
        cellTemplate: "actionTemplate",
        alignment: "center",
        allowExporting: true
      },
      {
        dataField: "name",
        caption: "Nombre",
        allowEditing: false
      },
      {
        dataField: "isActive",
        caption: "Estado",
        allowEditing: false,
        width: "120",
        alignment: "center",
        cellTemplate: "statusTemplate",
        calculateDisplayValue: (value: boolean) => value ? "ACTIVE" : "INACTIVE"
      }
    ];
  }

  ngOnInit(): void {
    this.setColumns();
    this.getGridData();
  }

  getGridData() {
   this._RequestTypesService.getAll().subscribe(result =>
     {
      this.GridData = [...result];


  });
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: RequestTypeDto) {
    debugger;
    this.createOrUpdateModal.showUpdate(data);

  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: RequestTypeDto) {
    if (requestResult.success) {
      this.getGridData();
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: RequestTypeDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let response_: RequestResult = new RequestResult();
      this._RequestTypesService.disable(data.id).subscribe((response_: RequestResult) => response_ = response_);
      this.validResponseDisableEnableAction(response_, data);

    }

  }
  async enable(data: RequestTypeDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let response_: RequestResult = new RequestResult();
      this._RequestTypesService.enable(data.id).subscribe((response_: RequestResult) => response_ = response_);
      this.validResponseDisableEnableAction(response_, data);

    }

  }
}
