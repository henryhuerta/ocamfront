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
import { DocumentTypeService } from '../document-type.service';
import { DocumentExtensionDto } from '../dtos/document-extension-dto';
import { DocumentTypeDto } from '../dtos/document-type-dto';

@Component({
  selector: 'app-create-or-update-document-type',
  templateUrl: './create-or-update-document-type.component.html',
  styleUrls: ['./create-or-update-document-type.component.scss'],
})
export class CreateOrUpdateDocumentTypeComponent
  extends AppComponentBase
  implements OnInit {
  title: string = 'Tipos de Documentos';

  Model: DocumentTypeDto = new DocumentTypeDto();
  OptionButtons: OptionButton[];
  errors: any = {};

  @ViewChild('entityComponent')
  entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  DxDataSourceState: any = {};

  extensionsTypesToShow: DocumentExtensionDto[] = [];
  extensionsTypesToSet: DocumentExtensionDto[] = [];

  ExtensionModel: DocumentExtensionDto = new DocumentExtensionDto();
  copyExtensionModel: DocumentExtensionDto = new DocumentExtensionDto();

  columnsExtensions: any[] = [];

  editingExtension: boolean = false;

  constructor(private _documentTypeService: DocumentTypeService) {
    super();
  }

  ngOnInit(): void {
    this.intializeColumnsExtensions();
  }

  intializeColumnsExtensions(): void {
    this.columnsExtensions = [
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
        dataField: 'extensionType',
        caption: 'Tipo de Extension',
        allowEditing: true,
      },
    ];
  }

  initializeView() {
    this.errors = {};
    this.Model = new DocumentTypeDto();
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

  onClickNewExtension() {
    let invalidExtension = this.extensionsTypesToShow.find((x) =>
      this.isEmptyOrNullString(x.extensionType)
    );
    if (!invalidExtension) {
      this.extensionsTypesToShow.push(new DocumentExtensionDto());
      this.extensionsTypesToSet.push(new DocumentExtensionDto());
    }
  }

  editExtension(data: DocumentExtensionDto) {
    this.editingExtension = true;
    this.ExtensionModel = data;
    this.copyExtensionModel = data;
  }

  deleteExtension(data: DocumentExtensionDto) {
    if (data.id > 0) {
      this.extensionsTypesToShow.forEach((extension) => {
        extension.isActive = false;
      });
    } else {
      let newExtensionToShow = this.extensionsTypesToShow.filter(
        (x) => x.extensionType !== data.extensionType
      );

      this.extensionsTypesToShow = newExtensionToShow;
    }
  }



  checkChangesExtensions(extensions: any) {
    if (extensions.length > 0) {
      let extensionsToShow = extensions.filter((x: any) => x.isActive);
      this.extensionsTypesToShow = extensionsToShow;
    }
  }

  cancelChangesExtension() {
    this.editingExtension = false;
    this.ExtensionModel = new DocumentExtensionDto();
    this.copyExtensionModel = new DocumentExtensionDto();
  }

  assignExtensionsToShow() {
    this.ExtensionModel = new DocumentExtensionDto();
    this.copyExtensionModel = new DocumentExtensionDto();

    let extensionsToShow = this.extensionsTypesToSet.filter((x) => x.isActive);
    this.extensionsTypesToShow = extensionsToShow;

    this.editingExtension = false;
  }

  saveExtension() {
    if (this.isEmptyOrNullString(this.ExtensionModel.extensionType)) {
      return;
    }

    if (this.editingExtension) {
      debugger;
      if (this.ExtensionModel.id > 0) {
        let invalidExtensions = this.extensionsTypesToSet.filter(
          (x) =>
            x.extensionType === this.ExtensionModel.extensionType &&
            x.id !== this.ExtensionModel.id
        );

        if (invalidExtensions.length > 0) {
          this.ExtensionModel = this.copyExtensionModel;
        } else {
          this.extensionsTypesToSet.forEach((extension) => {
            if (extension.id === this.ExtensionModel.id) {
              extension.extensionType = this.ExtensionModel.extensionType;
            }
          });

          this.assignExtensionsToShow();
        }
      } else {
        let indexExtensionToChange = this.extensionsTypesToSet.findIndex(
          (x) => x.extensionType === this.copyExtensionModel.extensionType
        );

        let indexRepeatedExtensionType = this.extensionsTypesToSet.findIndex(
          (x) => x.extensionType === this.ExtensionModel.extensionType
        );

        if (indexRepeatedExtensionType === -1) {
          this.ExtensionModel = this.copyExtensionModel;
        } else {
          this.extensionsTypesToSet[indexExtensionToChange].extensionType =
            this.ExtensionModel.extensionType;

          this.assignExtensionsToShow();
        }
      }
    } else {
      let invalidExtensions = this.extensionsTypesToSet.filter(
        (x) => x.extensionType === this.ExtensionModel.extensionType
      );

      if (invalidExtensions.length > 0) {
        this.ExtensionModel = this.copyExtensionModel;
      } else {
        this.extensionsTypesToSet.push(this.ExtensionModel);

        this.assignExtensionsToShow();
      }
    }
  }

  checkExtensionBeforeSave() {
    let invalidExtension = this.extensionsTypesToSet.filter(
      (x) => x.extensionType === this.ExtensionModel.extensionType
    );
    if (invalidExtension.length <= 1) {
      this.extensionsTypesToSet.push(this.ExtensionModel);

      this.ExtensionModel = new DocumentExtensionDto();
      this.copyExtensionModel = new DocumentExtensionDto();

      let extensionsToShow = this.extensionsTypesToSet.filter(
        (x) => x.isActive
      );
      this.extensionsTypesToShow = extensionsToShow;
    } else {
      if (this.ExtensionModel.id > 0) {
        this.extensionsTypesToSet.forEach((extension) => {
          if (extension.id === this.ExtensionModel.id) {
            extension.extensionType = this.ExtensionModel.extensionType;
          }
        });
      } else {
        this.extensionsTypesToSet.forEach((extension) => {
          if (
            extension.extensionType === this.copyExtensionModel.extensionType
          ) {
            extension.extensionType = this.ExtensionModel.extensionType;
          }
        });
      }

      this.ExtensionModel = new DocumentExtensionDto();
      this.copyExtensionModel = new DocumentExtensionDto();

      let extensionsToShow = this.extensionsTypesToSet.filter(
        (x) => x.isActive
      );
      this.extensionsTypesToShow = extensionsToShow;
    }
  }

  showUpdate(data: DocumentTypeDto) {
    this.initializeView();
    this.setButtonOptions(true);
    this._documentTypeService
      .getById(data.id)
      .subscribe((response_: DocumentTypeDto) => {
        this.Model = response_;

        this.entityComponent.show();

        this.extensionsTypesToShow = this.Model.documentTypeExtensions;
        this.extensionsTypesToSet = this.Model.documentTypeExtensions;
      });
  }

  showAdd() {
    this.initializeView();
    this.setButtonOptions();
    this.Model = new DocumentTypeDto();
    this.extensionsTypesToShow = [];
    this.extensionsTypesToSet = [];
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
      this.Model = new DocumentTypeDto();
      this.modalSave.emit();
      this.close();
    } else {
      this.error(requestResult.title, requestResult.messageResponse);
      this.errors = requestResult.errors;
    }
  }

  async save() {
    let extensionsToSave = this.extensionsTypesToSet.filter(
      (x) => x.isActive
    );
    this.Model.documentTypeExtensions = extensionsToSave;
    if (this.isEmptyOrNullNumber(this.Model.id)) {
      this._documentTypeService.create(this.Model)
        .subscribe((response_: RequestResult) => this.validResponse(response_));
    } else {
      this._documentTypeService.update(this.Model)
        .subscribe((response_: RequestResult) => this.validResponse(response_));
    }
  }

  close() {
    this.entityComponent.close();
  }
}
