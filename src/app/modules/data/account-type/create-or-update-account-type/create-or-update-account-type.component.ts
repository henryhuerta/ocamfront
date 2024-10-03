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
import { AccountTypeService } from '../account-type.service';
import { CreateOrUpdateAccountDocumentComponent } from '../create-or-update-account-document/create-or-update-account-document.component';
import { CreateOrUpdateAccountRequirementComponent } from '../create-or-update-account-requirement/create-or-update-account-requirement.component';
import { AccountTypeDocumentDto } from '../dtos/account-type-dto';
import {
  AccountTypeDto,
  AccountTypeRequirementDto,
} from '../dtos/account-type-dto';

@Component({
  selector: 'app-create-or-update-account-type',
  templateUrl: './create-or-update-account-type.component.html',
  styleUrls: ['./create-or-update-account-type.component.scss'],
})
export class CreateOrUpdateAccountTypeComponent
  extends AppComponentBase
  implements OnInit {
  title: string = 'Tipos de Cuenta';

  Model: AccountTypeDto = new AccountTypeDto();
  OptionButtons: OptionButton[];
  errors: any = {};

  tabsLinks: string[] = ['requirements', 'documents'];
  selectedTab: string = this.tabsLinks[0];

  @ViewChild('entityComponent')
  entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();
  columnsRequirements: any[] = [];
  columnsDocuments: any[] = [];

  @ViewChild('createOrUpdateRequirementModal')
  createOrUpdateRequirementModal: CreateOrUpdateAccountRequirementComponent;

  @ViewChild('createOrUpdateDocumentModal')
  createOrUpdateDocumentModal: CreateOrUpdateAccountDocumentComponent;

  addingNewRequirement: boolean = false;
  addingNewDocument: boolean = false;

  copyRequirement: AccountTypeRequirementDto = new AccountTypeRequirementDto();
  copyDocument: AccountTypeDocumentDto = new AccountTypeDocumentDto();

  copyRequirements: AccountTypeRequirementDto[] = [];
  copyDocuments: AccountTypeDocumentDto[] = [];

  constructor(private _accountTypeService: AccountTypeService) {
    super();
  }

  ngOnInit(): void {
    this.intializeColumns();
  }

  initializeView() {
    this.errors = {};
    this.Model = new AccountTypeDto();
  }

  clickTab(id: string) {
    this.selectedTab = id;
  }
  intializeColumns(): void {
    this.columnsRequirements = [
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
        dataField: 'requirement',
        caption: 'Requerimiento',
        allowEditing: false,
      },
    ];

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
    ];
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

  showUpdate(data: AccountTypeDto) {
    this.initializeView();
    this.setButtonOptions(true);
    this._accountTypeService
      .getById(data.id)
      .subscribe((response_: AccountTypeDto) => {
        this.Model = response_;

        this.copyRequirements = this.Model.accountTypeRequirements.slice(0);
        this.copyDocuments = this.Model.accountTypeDocuments.slice(0);

        this.entityComponent.show();
      });
  }

  showAdd() {
    this.initializeView();
    this.setButtonOptions();
    this.Model = new AccountTypeDto();
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

  save() {
    if (this.isEmptyOrNullNumber(this.Model.id)) {
      this.prepareRequirementsBeforeSave();
      this.prepareDocumentsBeforeSave();
      this._accountTypeService
        .create(this.Model)
        .subscribe((response_: RequestResult) => this.validResponse(response_));
    } else {
      this.prepareRequirementsBeforeSave();
      this.prepareDocumentsBeforeSave();
      this._accountTypeService
        .update(this.Model)
        .subscribe((response_: RequestResult) => this.validResponse(response_));
    }
  }

  prepareRequirementsBeforeSave() {
    this.Model.accountTypeRequirements.forEach((req) => {
      let reqChanged = this.copyRequirements.find((x) => x.id === req.id);

      if (reqChanged) {
        req = reqChanged;
      } else {
        req.isActive = false;
      }
    });

    this.copyRequirements.forEach((req) => {
      if (req.id === 0) {
        this.Model.accountTypeRequirements.push(req);
      }
    });
  }

  prepareDocumentsBeforeSave() {
    this.Model.accountTypeDocuments.forEach((req) => {
      let docChanged = this.copyDocuments.find((x) => x.id === req.id);

      if (docChanged) {
        req = docChanged;
      } else {
        req.isActive = false;
      }
    });

    this.copyDocuments.forEach((req) => {
      if (req.id === 0) {
        this.Model.accountTypeDocuments.push(req);
      }
    });
  }

  close() {
    this.entityComponent.close();
  }

  createRequirement() {
    this.addingNewRequirement = true;
    this.createOrUpdateRequirementModal.showAdd();
  }

  updateRequirement(data: AccountTypeRequirementDto) {
    this.addingNewRequirement = false;
    this.copyRequirement = data;
    this.createOrUpdateRequirementModal.showUpdate(data);
  }

  saveRequirement(data: AccountTypeRequirementDto) {
    if (this.addingNewRequirement) {
      this.copyRequirements.push(data);
      this.copyRequirement = new AccountTypeRequirementDto();
      this.addingNewRequirement = false;
    } else {
      if (data.id > 0) {
        this.copyRequirements.forEach((req) => {
          if (req.id === data.id) {
            req.requirement = data.requirement;
          }
        });
      } else {
        this.copyRequirements.forEach((req) => {
          if (req.requirement === this.copyRequirement.requirement) {
            req.requirement = data.requirement;
          }
        });
      }
      this.copyRequirement = new AccountTypeRequirementDto();
      this.addingNewRequirement = false;
    }
  }

  createDocument() {
    this.addingNewDocument = true;
    this.createOrUpdateDocumentModal.showAdd();
  }

  updateDocument(data: AccountTypeDocumentDto) {
    this.addingNewDocument = false;
    this.copyDocument = data;
    this.createOrUpdateDocumentModal.showUpdate(data);
  }

  saveDocument(data: AccountTypeDocumentDto) {
    if (this.addingNewDocument) {
      debugger;
      this.copyDocuments.push(data);
      this.copyDocument = new AccountTypeDocumentDto();
      this.addingNewDocument = false;
    } else {
      debugger;
      if (data.id > 0) {
        this.copyDocuments.forEach((doc) => {
          if (doc.id === data.id) {
            doc.required = data.required;
            doc.description = data.description;
            doc.lastUpdated = data.lastUpdated;
          }
        });
      } else {
        this.copyDocuments.forEach((doc) => {
          if (
            doc.description === this.copyDocument.description &&
            doc.lastUpdated === this.copyDocument.lastUpdated &&
            doc.required === this.copyDocument.required
          ) {
            doc.description = data.description;
            doc.required = data.required;
            doc.lastUpdated = data.lastUpdated;
          }
        });
      }
      this.copyRequirement = new AccountTypeRequirementDto();
      this.addingNewRequirement = false;
    }
  }

  deleteRequirement(data: AccountTypeRequirementDto) {
    if (data.id > 0) {
      this.copyRequirements.forEach((req) => {
        if (req.id === data.id) {
          req.isActive = false;
        }
      });
      this.copyRequirements = this.copyRequirements
        .slice(0)
        .filter((x) => x.isActive);
    } else {
      let copyReqs: AccountTypeRequirementDto[] = [];
      this.copyRequirements.forEach((req) => {
        if (req.requirement !== data.requirement) {
          debugger;
          copyReqs.push(req);
        }
      });
      this.copyRequirements = [];
      this.copyRequirements = copyReqs.filter((x) => x.isActive);
    }
  }

  deleteDocument(data: AccountTypeDocumentDto) {
    if (data.id > 0) {
      this.copyDocuments.forEach((doc) => {
        if (doc.id === data.id) {
          doc.isActive = false;
        }
      });
      this.copyDocuments = this.copyDocuments
        .slice(0)
        .filter((x) => x.isActive);
    } else {
      let copyDocs: AccountTypeDocumentDto[] = [];
      this.copyDocuments.forEach((doc) => {
        if (
          doc.description !== data.description &&
          doc.lastUpdated !== data.lastUpdated &&
          doc.required !== data.required &&
          doc.documentTypeId !== data.documentTypeId
        ) {
          copyDocs.push(doc);
        }
      });
      this.copyDocuments = [];
      this.copyDocuments = copyDocs.filter((x) => x.isActive);
    }
  }
}
