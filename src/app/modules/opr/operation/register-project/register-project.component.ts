import { Component, OnInit } from '@angular/core';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { AccountTypeDto } from '../../../data/account-type/dtos/account-type-dto';
import {
  ProjectRequestDto,
  ProjectDocument,
} from '../dtos/project-request-dto';
import { CertifierService } from '../../../data/certifier/certifier.service';
import { AccountTypeService } from '../../../data/account-type/account-type.service';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { OperationsService } from '../operations.service';
import { CertifierDto } from '../../../data/certifier/dtos/certifier-dto';
import { DocumentTypeDto } from '../../../data/document-type/dtos/document-type-dto';
import { DocumentExtensionDto } from '../../../data/document-type/dtos/document-extension-dto';
import { DocumentTypeFilterDto } from '../../../data/document-type/dtos/document-type-filter';
import { DocumentTypeService } from 'src/app/modules/data/document-type/document-type.service';
import { TechtypeService } from 'src/app/modules/data/tech-type/tech-type.service';
import { TechTypeDto } from 'src/app/modules/data/tech-type/dtos/tech-type-dtos';
import { AuthService } from 'src/app/modules/auth';

@Component({
  selector: 'app-register-project',
  templateUrl: './register-project.component.html',
  styleUrls: ['./register-project.component.scss'],
})
export class RegisterProjectComponent
  extends AppComponentBase
  implements OnInit {
  Model: ProjectRequestDto = new ProjectRequestDto();

  DxDataSourceCertifiers: any = {};
  DxAccountTypes: AccountTypeDto[] = [];
  DxDataSourceTechtypes: any = {};

  errors: any = {};
  accountType: AccountTypeDto = new AccountTypeDto();

  extensionsAllowed: string[] = [];

  documentsAllowed: DocumentTypeDto[] = [];

  files: any[] = [];

  constructor(
    private operationsService: OperationsService,
    private certifierService: CertifierService,
    private accountTypeService: AccountTypeService,
    private documentTypeService: DocumentTypeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getCertifiers();
    this.getAccountTypes();
  }

  getCertifiers() {
    this.certifierService.getActives().subscribe((res: CertifierDto[]) => {
      this.DxDataSourceCertifiers = this.getDataSourceDx(res);
    });
  }

  getAccountTypes() {
    this.accountTypeService.getActives().subscribe((res: AccountTypeDto[]) => {
      this.DxAccountTypes = res;
    });
  }

  Certifier: CertifierDto = new CertifierDto();
  onItemClickCertifier(certifier: CertifierDto) {
    this.Certifier = certifier;
  }

  uploadFile(event: any, docName: string, docId: number) {
    let fileToUpload = <File>event.target.files[0];

    let isValid = true;// this.checkExtensionsBeforeUpload(fileToUpload, docId);

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

  getAccountTypeById(id: number) {
    this.Model.accountTypeId = id;
    this.Certifier = new CertifierDto();

    this.accountTypeService.getById(id).subscribe((res: AccountTypeDto) => {
      this.accountType = res;

      if (res.id > 0) {
        let filterModelrequest = new DocumentTypeFilterDto();

        res.accountTypeDocuments.forEach((doc) => {
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
      this.documentsAllowed.forEach((document) => {
        let extensions: string[] = [];
        document.documentTypeExtensions.forEach((extension) => {
          extensions.push(extension.extensionType);
        });
        document.extensionsAllowed = String(extensions);
      });
    }
  }

  save() {
    const formData = new FormData();
    this.files.forEach((file) => { formData.append(`${file.docType}`, file.file); });
    formData.append("accountTypeId", this.Model.accountTypeId.toString());
    this.operationsService
      .createProject(formData)
      .subscribe((res: RequestResult) => {
        this.validResponse(res);
      });
  }

  validResponse(requestResult: RequestResult) {
    if (requestResult.success) {
      this.success(requestResult.title, requestResult.messageResponse);
      this.Model = new ProjectRequestDto();
    } else {
      this.error(requestResult.title, requestResult.messageResponse);
      this.errors = requestResult.errors;
    }
  }
}
