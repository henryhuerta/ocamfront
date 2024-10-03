import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalWithOptionButtonsComponent } from 'src/app/shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { DocumentationDto } from 'src/app/shared/models/documentation-dto';
import { OptionButton } from 'src/app/shared/models/option-button';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { AuthenticationService } from 'src/app/_base/services/authentication.service';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { DocumentationService } from 'src/app/_base/services/documentation.service';
import { ProjectRequest } from '../dtos/project-request';
import { ProjectRequestDocumentDto } from '../dtos/project-request-document';

@Component({
  selector: 'app-documents-project-request',
  templateUrl: './documents-project-request.component.html',
})
export class DocumentsProjectRequestComponent
  extends AppComponentBase
  implements OnInit {
  title: string = 'DOCUMENTACIÓN';

  documents: ProjectRequestDocumentDto[] = [];
  Docs: DocumentationDto[] = [];
  ProjectId: number = 0;
  OptionButtons: OptionButton[];

  @ViewChild('entityComponent')
  entityComponent: ModalWithOptionButtonsComponent;

  constructor(
    private _docService: DocumentationService,
    private _authService: AuthenticationService,
    private _configService: ConfigService
  ) {
    super();
  }

  ngOnInit(): void { }

  getDocs() {
    this._docService
      .getDocuments(this._authService.currentUserValue.tenantId,
        this.ProjectId,
        "PROJECT").subscribe((res: DocumentationDto[]) => {
          this.Docs = res;
        });
  }

  show(data: ProjectRequestDocumentDto[], projectId: number) {
    this.ProjectId = projectId;
    this.setButtonOptions(true);
    this.getDocs();
    this.documents = data;
    this.entityComponent.show();
  }

  setButtonOptions(update?: boolean | null) {
    this.OptionButtons = [
      new OptionButton(
        'close',
        'Cerrar',
        'btn btn-danger pull-right',
        'fa fa-times'
      ),
    ];
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case 'close':
        this.close();
        break;
    }
  }

  close() {
    this.entityComponent.close();
  }

  download(doc: ProjectRequestDocumentDto) {
    let item = this.Docs.find(c => c.name == doc.fileName);
    let url_ = this._configService.config.document;
    url_ += `Attachment/DownloadById2?id=${item?.idAttachment}`;
    window.open(url_, '_blank');

  }
}
