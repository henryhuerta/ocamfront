import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestTypesService } from 'src/app/modules/data/request-types/request-types.service';
import { AppComponentBase } from '../../../../../_base/AppComponentBase';
import { RequestTypeDto } from '../../../../data/request-types/dtos/request-type-dtos';
import { RequestDocument, RequestDTO } from '../../dtos/request-dto';
import { RequestService } from '../../request.service';
import { RequestResult } from '../../../../../_base/models/RequestResult';
import { DocumentTypeDto } from 'src/app/modules/data/document-type/dtos/document-type-dto';
import { DocumentTypeFilterDto } from 'src/app/modules/data/document-type/dtos/document-type-filter';
import { DocumentTypeService } from 'src/app/modules/data/document-type/document-type.service';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-create-request-by-type',
  templateUrl: './create-request-by-type.component.html',
  styleUrls: ['./create-request-by-type.component.scss'],
})
export class CreateRequestByTypeComponent
  extends AppComponentBase
  implements OnInit {
  Model: RequestDTO = new RequestDTO();

  RequestType: RequestTypeDto = new RequestTypeDto();
  routeSub: Subscription;
  id: number;
  errors: any = {};
  enablePercentInput: boolean = false;

  documentsAllowed: DocumentTypeDto[] = [];

  files: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private requestService: RequestService,
    private requestTypesService: RequestTypesService,
    private documentTypeService: DocumentTypeService,
    private _authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.routeSub = this._route.params.subscribe((params) => {
      this.id = params['id'];

      if (!this.isEmptyOrNullNumber(this.id) && this.id > 0) {
        this.getRequestType(this.id);
      }
    });
  }

  getRequestType(id: number) {
    this.requestTypesService.getById(id).subscribe((res: RequestTypeDto) => {
      this.RequestType = res;

      this.enablePercentInput = false;

      let enablePercent = res.requestTypeDocuments.find(
        (x) => x.enableInputPercent === true
      );

      if (enablePercent) {
        this.enablePercentInput = true;
      }

      if (res.id > 0) {
        let filterModelrequest = new DocumentTypeFilterDto();

        res.requestTypeDocuments.forEach((doc) => {
          filterModelrequest.documentTypeIds.push(doc.documentTypeId);
        });

        this.documentTypeService
          .getByFilterIds(filterModelrequest)
          .subscribe((response: DocumentTypeDto[]) => {
            this.documentsAllowed = response;

            this.assignExtensionsToRequestDocuments();
          });
      }
    });
  }

  assignExtensionsToRequestDocuments() {
    if (this.documentsAllowed.length > 0) {
      this.RequestType.requestTypeDocuments.forEach((requestDocument) => {
        let documentType = this.documentsAllowed.find(
          (x) => x.id === requestDocument.documentTypeId
        );

        if (documentType) {
          let extensions: string[] = [];
          documentType.documentTypeExtensions.forEach((extension) => {
            extensions.push(extension.extensionType);
          });
          requestDocument.extensionsAllowed = String(extensions);
        }
      });
    }
  }

  uploadFiles(event: any, docId: number) {
    let fileToUpload = <File>event.target.files[0];

    let isValid = true;

    if (isValid) {
      let existingFile = this.files.find(x => x.file.name == fileToUpload.name) as File;
      if (!existingFile) {
        this.files.push({ file: fileToUpload, docType: docId });
      } else {
        let idx = this.files.indexOf(existingFile);
        this.files.splice(idx, 1)
        this.files.push({ file: fileToUpload, docType: docId });
      }
    }
  }

  checkExtensionsBeforeUpload(file: File, docId: number) {
    let fileExtension = `.${file.name.split('.')[1].toUpperCase()}`;
    let documentType = this.documentsAllowed.find((x) => x.id === docId);

    if (documentType) {
      let validExtension = documentType.documentTypeExtensions.find(
        (x) => x.extensionType.toUpperCase() === fileExtension
      );

      if (validExtension) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  save() {

    let currentUserLogged = this._authService.currentUserValue;

    const formData = new FormData();
    this.files.forEach((file) => { formData.append(`${file.docType}`, file.file); });
    formData.append("requestTypeId", this.id.toString());
    formData.append("percent", this.Model.percent.toString());
    formData.append("requesterName", currentUserLogged?.fullname ?? '');

    this.requestService
      .create(formData)
      .subscribe((res: RequestResult) => {
        this.validResponse(res);
      });
  }

  cancel() {
    this.RequestType = new RequestTypeDto();
    this.Model = new RequestDTO();
    this._router.navigate(['/request/create-request']);
  }

  validResponse(requestResult: RequestResult) {
    if (requestResult.success) {
      this.success(requestResult.title, requestResult.messageResponse);
    } else {
      this.error(requestResult.title, requestResult.messageResponse);
      this.errors = requestResult.errors;

    }
  }
}
