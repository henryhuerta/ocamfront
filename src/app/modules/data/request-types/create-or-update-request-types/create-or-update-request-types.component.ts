import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalWithOptionButtonsComponent } from 'src/app/shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from 'src/app/shared/models/option-button';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { CreateOrUpdateRequestTypeDocumentComponent } from '../create-or-update-request-type-document/create-or-update-request-type-document.component';
import { RequestTypeDocumentDto, RequestTypeDto } from '../dtos/request-type-dtos';
import { RequestTypesService } from '../request-types.service';

@Component({
  selector: 'app-create-or-update-request-types',
  templateUrl: './create-or-update-request-types.component.html',
  styleUrls: ['./create-or-update-request-types.component.scss']
})
export class CreateOrUpdateRequestTypesComponent extends AppComponentBase implements OnInit {
  Model: RequestTypeDto = new RequestTypeDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  tabsLinks: string[] = ['documents'];
  selectedTab: string = this.tabsLinks[0];

  DxSelectBoxData: any = {};

  title: string = "Tipos de solicitudes";

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();
  columnsDocuments: any[] = [];

  @ViewChild('createOrUpdateDocumentModal')
  createOrUpdateDocumentModal: CreateOrUpdateRequestTypeDocumentComponent;

  addingNewDocument: boolean = false;
  DxDataSourceState: any = {};
  copyDocument: RequestTypeDocumentDto = new RequestTypeDocumentDto();

  constructor(
    private _RequestTypeService: RequestTypesService
  ) {
    super();
  }

  async ngOnInit() {
    await this.initializeView();
    this.getSelectBox();
  }

  getSelectBox() {
    this.DxSelectBoxData = this.getDataSourceDx([{
      text: "Text 1",
      value: 1
    }]);
  }

  async initializeView() {
    this.errors = {};
    //this.Model = new RequestTypeDto();

  }

  clickTab(id: string) {
    this.selectedTab = id;
  }

  intializeColumns(): void {
    this.columnsDocuments = [
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
        dataField: 'description',
        caption: 'Descripcion',
        allowEditing: false,
      },
      {
        dataField: 'lastUpdated',
        caption: 'Ultima actualizacion',
        allowEditing: false,
        cellTemplate: 'dateTemplate',
      },
      {
        dataField: 'required',
        caption: 'Requerido',
        allowEditing: false,
        cellTemplate: 'checkTemplate',
      },
      {
        dataField: 'multiple',
        caption: 'Multiple',
        allowEditing: false,
        cellTemplate: 'checkTemplate',
      },
      {
        dataField: 'enableInputPercent',
        caption: 'Habilitar % de redención',
        allowEditing: false,
        cellTemplate: 'checkTemplate',
      },
    ];
  }
  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    this.OptionButtons = [
      new OptionButton("close", "Cerrar", "btn btn-danger pull-right", "fa fa-times"),
      new OptionButton("save", "Guardar", "btn btn-success pull-right", "fa fa-save", permission)
    ];
  }

  async showUpdate(data: RequestTypeDto) {
    debugger;
    await this.initializeView();
    this.setButtonOptions(true);
    this._RequestTypeService.getById(data.id).subscribe((response_: RequestTypeDto) => {
      this.Model = response_;
    });
    this.entityComponent.show();
  }

  async showAdd() {
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new RequestTypeDto();
    this.entityComponent.show();
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case "save":
        this.save();
        break;
      case "close":
        this.close();
        break;
    }
  }

  validResponse(requestResult: RequestResult) {
    if (requestResult.success) {
      this.success(requestResult.title, requestResult.messageResponse);
      this.modalSave.emit();
      this.close();
    } else {
      this.error(requestResult.title, requestResult.messageResponse);
      this.errors = requestResult.errors;
    }
  }

  async save() {

    if (this.isEmptyOrNullNumber(this.Model.id)) {

      this._RequestTypeService.create(this.Model)
        .subscribe((response_: RequestResult) => this.validResponse(response_));


    } else {

      this._RequestTypeService.update(this.Model, this.Model.id)
        .subscribe((response_: RequestResult) => this.validResponse(response_));
    }
  }

  close() {
    this.entityComponent.close();
  }


  createDocument() {
    this.addingNewDocument = true;
    this.createOrUpdateDocumentModal.showAdd();
  }

  updateDocument(data: RequestTypeDocumentDto) {
    this.addingNewDocument = false;
    this.copyDocument = data;
    this.createOrUpdateDocumentModal.showUpdate(data);
  }

  saveDocument(data: RequestTypeDocumentDto) {

    if (this.addingNewDocument) {
      this.Model.requestTypeDocuments.push(data);
      this.copyDocument = new RequestTypeDocumentDto();
      this.addingNewDocument = false;
    } else {
      if (data.id > 0) {
        this.Model.requestTypeDocuments.forEach((doc) => {
          if (doc.id === data.id) {
            doc.required = data.required;
            doc.multiple = data.multiple;
            doc.enableInputPercent = data.enableInputPercent;
            doc.description = data.description;
            doc.lastUpdated = data.lastUpdated;
          }
        });
      } else {
        this.Model.requestTypeDocuments.forEach((doc) => {
          if (
            doc.description === this.copyDocument.description &&
            doc.lastUpdated === this.copyDocument.lastUpdated &&
            doc.required === this.copyDocument.required &&
            doc.multiple === this.copyDocument.multiple &&
            doc.enableInputPercent === this.copyDocument.enableInputPercent
          ) {
            doc.description = data.description;
            doc.required = data.required;
            doc.multiple = data.multiple;
            doc.enableInputPercent = data.enableInputPercent;
            doc.lastUpdated = data.lastUpdated;
          }
        });
      }
      this.copyDocument = new RequestTypeDocumentDto();
      this.addingNewDocument = false;
    }
  }
}
