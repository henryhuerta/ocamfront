import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { AdminRequestService } from '../admin-request.service';
import { DocumentsRequestComponent } from '../documents-request/documents-request.component';
import { RequestDTO } from '../dtos/request';
import { RejectRequestComponent } from '../reject-request/reject-request.component';

@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.scss'],
})
export class ListRequestsComponent extends AppComponentBase implements OnInit {
  title: string = 'Verificación de solicitudes';

  DataSourceRequests: RequestDTO[] = [];

  Request: RequestDTO = new RequestDTO();

  @ViewChild('rejectRequestModal')
  rejectRequestModal: RejectRequestComponent;

  @ViewChild('documentsRequestModal')
  documentsRequestModal: DocumentsRequestComponent;

  constructor(private _adminRequestService: AdminRequestService) {
    super();
  }
  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this._adminRequestService.getAll().subscribe((res: RequestDTO[]) => {
      this.DataSourceRequests = res;

    });
  }

  showDocuments(data: RequestDTO) {
    this._adminRequestService
      .getById(data.id)
      .subscribe((res: RequestDTO) => {
        this.Request = res;
        if (res.id > 0) {
          this.documentsRequestModal.show(this.Request);
        }
      });
  }

  showReject(data: RequestDTO) {
    this.rejectRequestModal.show(data);
  }

  approveProject(data: RequestDTO) {
    this._adminRequestService
      .getById(data.id)
      .subscribe((res: RequestDTO) => {
        this.Request = res;

        if (res.id > 0) {
          this._adminRequestService
            .approve(res.id)
            .subscribe((result: RequestResult) => {
              this.validResponseApproveRejectAction(result);
            });
        }
      });
  }

  validResponseApproveRejectAction(
    requestResult: RequestResult
  ) {
    if (requestResult.success) {
      this.getRequests();
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }
}
