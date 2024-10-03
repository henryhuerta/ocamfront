import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalWithOptionButtonsComponent } from 'src/app/shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { DocumentationDto } from 'src/app/shared/models/documentation-dto';
import { OptionButton } from 'src/app/shared/models/option-button';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { AuthenticationService } from 'src/app/_base/services/authentication.service';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { DocumentationService } from 'src/app/_base/services/documentation.service';
import { RequestDTO } from '../dtos/request';
import { RequestDocumentDto } from '../dtos/request-documents';

@Component({
  selector: 'app-documents-request',
  templateUrl: './documents-request.component.html',
  styleUrls: ['./documents-request.component.scss'],
})
export class DocumentsRequestComponent
  extends AppComponentBase
  implements OnInit {
  title: string = 'Documentos de Solicitudes';

  ProjectRequest: RequestDTO = new RequestDTO();
  Docs: DocumentationDto[] = [];

  documents: RequestDocumentDto[] = [];
  OptionButtons: OptionButton[];

  @ViewChild('entityComponent')
  entityComponent: ModalWithOptionButtonsComponent;

  constructor(
    private _authService: AuthenticationService,
    private _docService: DocumentationService,
    private _configService: ConfigService
  ) {
    super();
  }

  ngOnInit(): void { }

  show(data: RequestDTO) {
    this.setButtonOptions(true);
    this.ProjectRequest = data;
    this.documents = data.requestDocuments;
    this.getDocs();
    this.entityComponent.show();
  }

  getDocs() {
    this._docService
      .getDocuments(this._authService.currentUserValue.tenantId,
        this.ProjectRequest.id,
        "REQUEST").subscribe((res: DocumentationDto[]) => {
          this.Docs = res;
        });
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
  download(doc: RequestDocumentDto) {
    let item = this.Docs.find(c => c.name == doc.fileName);
    let url_ = this._configService.config.document;
    url_ += `Attachment/DownloadById2?id=${item?.idAttachment}`;
    window.open(url_, '_blank');

  }
}
