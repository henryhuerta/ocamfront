import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { AdminProjectRequestService } from '../admin-project-request.service';
import { DocumentsProjectRequestComponent } from '../documents-project-request/documents-project-request.component';
import { ProjectRequest } from '../dtos/project-request';
import { ProjectRequestDocumentDto } from '../dtos/project-request-document';
import { RejectProjectRequestComponent } from '../reject-project-request/reject-project-request.component';

@Component({
  selector: 'app-list-project-request',
  templateUrl: './list-project-request.component.html'
})
export class ListProjectRequestComponent
  extends AppComponentBase
  implements OnInit {
  title: string = 'Solicitudes de Proyectos';
  DataSourceProjectRequests: ProjectRequest[] = [];

  ProjectRequest: ProjectRequest = new ProjectRequest();

  @ViewChild('rejectProjectRequestModal')
  rejectProjectRequestModal: RejectProjectRequestComponent;

  @ViewChild('documentsProjectRequestModal')
  documentsProjectRequestModal: DocumentsProjectRequestComponent;

  constructor(private _adminProjectRequestService: AdminProjectRequestService) {
    super();
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this._adminProjectRequestService
      .getAll()
      .subscribe((res: ProjectRequest[]) => {
        this.DataSourceProjectRequests = res;
      });
  }

  showDocuments(data: ProjectRequest) {
    this._adminProjectRequestService
      .getDocsById(data.id)
      .subscribe((res: ProjectRequestDocumentDto[]) => {
        this.documentsProjectRequestModal.show(res, data.id);
      });
  }

  showReject(data: ProjectRequest) {
    this.rejectProjectRequestModal.show(data.id);
  }

  approveProject(data: ProjectRequest) {
    this._adminProjectRequestService
      .approve(data.id)
      .subscribe((result: RequestResult) => {
        this.validResponseApproveRejectAction(result);
      });
  }

  validResponseApproveRejectAction(
    requestResult: RequestResult
  ) {
    if (requestResult.success) {
      this.getProjects();
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }
}
