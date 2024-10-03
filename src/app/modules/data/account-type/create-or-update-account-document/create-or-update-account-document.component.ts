import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalWithOptionButtonsComponent } from 'src/app/shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from 'src/app/shared/models/option-button';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { DocumentTypeService } from '../../document-type/document-type.service';
import { DocumentTypeDto } from '../../document-type/dtos/document-type-dto';
import { AccountTypeDocumentDto } from '../dtos/account-type-dto';

@Component({
  selector: 'app-create-or-update-account-document',
  templateUrl: './create-or-update-account-document.component.html',
  styleUrls: ['./create-or-update-account-document.component.scss'],
})
export class CreateOrUpdateAccountDocumentComponent
  extends AppComponentBase
  implements OnInit
{
  title: string = 'Documentos';

  Model: AccountTypeDocumentDto = new AccountTypeDocumentDto();
  OptionButtons: OptionButton[];
  errors: any = {};

  documentsTypeDource: any = {};

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
    this.Model = new AccountTypeDocumentDto();
  }

  getDocumentTypes() {
    this._documentTypeService
      .getActives()
      .subscribe((res: DocumentTypeDto[]) => {
        this.documentsTypeDource = this.getDataSourceDx(res);
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

  showUpdate(data: AccountTypeDocumentDto) {
    this.initializeView();
    this.setButtonOptions(true);

    this.Model = data;
    this.entityComponent.show();
  }

  showAdd() {
    this.initializeView();
    this.setButtonOptions();
    this.Model = new AccountTypeDocumentDto();
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
    // if (this.isEmptyOrNullNumber(this.Model.id)) {
    //   this._certifierService.create(this.Model)
    //     .subscribe((response_: RequestResult) => this.validResponse(response_));
    // } else {
    //   // this._certifierService.update(this.Model, this.Model.id)
    //   //   .subscribe((response_: RequestResult) => this.validResponse(response_));
    // }

    this.modalSave.emit(this.Model);
    this.close();
  }

  close() {
    this.entityComponent.close();
  }
}
