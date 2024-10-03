import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalWithOptionButtonsComponent } from 'src/app/shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from 'src/app/shared/models/option-button';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { DocumentTypeService } from '../../document-type/document-type.service';
import { DocumentTypeDto } from '../../document-type/dtos/document-type-dto';
import { RequestTypeDocumentDto } from '../dtos/request-type-dtos';

@Component({
  selector: 'app-create-or-update-request-type-document',
  templateUrl: './create-or-update-request-type-document.component.html',
  styleUrls: ['./create-or-update-request-type-document.component.scss']
})
export class CreateOrUpdateRequestTypeDocumentComponent extends AppComponentBase implements OnInit {

  title: string = 'Documentos';

  Model: RequestTypeDocumentDto = new RequestTypeDocumentDto();
  OptionButtons: OptionButton[];
  errors: any = {};

  documentsTypeSource: any = {};

  @ViewChild('entityComponent')
  entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(private _documentTypeService: DocumentTypeService) {
    super();
  }

  ngOnInit(): void {
    this.getDocumentTypes();
  }

  initializeView() {
    this.errors = {};
    this.Model = new RequestTypeDocumentDto();
  }

  getDocumentTypes() {
    this._documentTypeService
      .getActives()
      .subscribe((res: DocumentTypeDto[]) => {
        this.documentsTypeSource = this.getDataSourceDx(res);
      });

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
      new OptionButton(
        'save',
        'Guardar',
        'btn btn-success pull-right',
        'fa fa-save',
        permission
      ),
    ];
  }

  showUpdate(data: RequestTypeDocumentDto) {
    this.initializeView();
    this.setButtonOptions(true);

    this.Model = data;

    this.entityComponent.show();

  }

  showAdd() {
    this.initializeView();
    this.setButtonOptions();
    this.Model = new RequestTypeDocumentDto();
    this.entityComponent.show();
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case 'save':
        this.save();
        break;
      case 'close':
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
    this.modalSave.emit(this.Model);
    this.close();
  }

  close() {
    this.entityComponent.close();
  }
}
