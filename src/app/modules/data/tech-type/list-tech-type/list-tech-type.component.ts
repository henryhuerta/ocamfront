import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { TechtypeService } from '../tech-type.service';
import { TechTypeDto } from '../dtos/tech-type-dtos';
import { CreateOrUpdateTechTypeComponent } from '../create-or-update-tech-type/create-or-update-tech-type.component';

@Component({
  selector: 'app-list-techtype',
  templateUrl: './list-tech-type.component.html'
})
export class ListtechtypeComponent extends AppComponentBase implements OnInit {
  title: string = "Tipos de Tecnologías";

  columns: any[] = [];
  GridData: TechTypeDto[] = [];

  public get data (){
    return this.GridData;
  }

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateTechTypeComponent;

  constructor(
    private _techtypeService: TechtypeService
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
        dataField: "code",
        caption: "Código",
        allowEditing: false
      },
      {
        dataField: "name",
        caption: "Nombre",
        allowEditing: false
      },
      {
        dataField: "description",
        caption: "Descripción",
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
   this._techtypeService.getAll().subscribe(result =>
     {
      this.GridData = [...result];

  });
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: TechTypeDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: TechTypeDto) {
    if (requestResult.success) {
      this.getGridData();
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: TechTypeDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let response_: RequestResult = new RequestResult();
      this._techtypeService.disable(data.id).subscribe((response_: RequestResult) => response_ = response_);
      this.validResponseDisableEnableAction(response_, data);

    }

  }
  async enable(data: TechTypeDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let response_: RequestResult = new RequestResult();
      this._techtypeService.enable(data.id).subscribe((response_: RequestResult) => response_ = response_);
      this.validResponseDisableEnableAction(response_, data);

    }

  }
}
