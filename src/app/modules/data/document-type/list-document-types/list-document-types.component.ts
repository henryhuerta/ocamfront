import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { CreateOrUpdateDocumentTypeComponent } from '../create-or-update-document-type/create-or-update-document-type.component';
import { DocumentTypeService } from '../document-type.service';
import { DocumentTypeDto } from '../dtos/document-type-dto';

@Component({
  selector: 'app-list-document-types',
  templateUrl: './list-document-types.component.html',
  styleUrls: ['./list-document-types.component.scss'],
})
export class ListDocumentTypesComponent
  extends AppComponentBase
  implements OnInit
{
  title: string = 'Tipos de Documentos';

  columns: any[] = [];

  DataSource: DocumentTypeDto[] = [];

  @ViewChild('createOrUpdateModal')
  createOrUpdateModal: CreateOrUpdateDocumentTypeComponent;

  constructor(private _documentTypeService: DocumentTypeService) {
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
        dataField: 'maxLength',
        caption: 'Tamaño Maximo (MB)',
        allowEditing: false,
      },
      // {
      //   dataField: "textBox",
      //   caption: "Name",
      //   allowEditing: false
      // },
      // {
      //   dataField: 'isActive',
      //   caption: 'Status',
      //   allowEditing: false,
      //   width: '120',
      //   alignment: 'center',
      //   cellTemplate: 'statusTemplate',
      //   calculateDisplayValue: (value: boolean) =>
      //     value ? 'ACTIVE' : 'INACTIVE',
      // },
    ];
  }

  getData() {
    this._documentTypeService.getAll().subscribe((res: DocumentTypeDto[]) => {
      this.DataSource = res;
    });
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: DocumentTypeDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(
    requestResult: RequestResult,
    item: DocumentTypeDto
  ) {
    if (requestResult.success) {
      // this.getGridData();
      this.getData();
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: DocumentTypeDto) {
    // let confirm = await this.confirm();
    // if (confirm.value) {
    let response_: RequestResult = new RequestResult();
    this._documentTypeService
      .disable(data.id)
      .subscribe((response_: RequestResult) => {
        response_ = response_;

        this.validResponseDisableEnableAction(response_, data);
      });

    // }
  }
  async enable(data: DocumentTypeDto) {
    // let confirm = await this.confirm();
    // if (confirm.value) {
    let response_: RequestResult = new RequestResult();
    this._documentTypeService
      .enable(data.id)
      .subscribe((response_: RequestResult) => {
        response_ = response_;
        this.validResponseDisableEnableAction(response_, data);
      });

    // }
  }
}
