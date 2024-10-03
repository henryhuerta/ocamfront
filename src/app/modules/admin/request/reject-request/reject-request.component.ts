import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalWithOptionButtonsComponent } from 'src/app/shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from 'src/app/shared/models/option-button';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { AdminRequestService } from '../admin-request.service';
import { RequestDTO } from '../dtos/request';
import { RequestLogDto } from '../dtos/request-log-dto';

@Component({
  selector: 'app-reject-request',
  templateUrl: './reject-request.component.html',
  styleUrls: ['./reject-request.component.scss'],
})
export class RejectRequestComponent extends AppComponentBase implements OnInit {
  title: string = '¿Esta seguro de rechazar esta solicitud?';
  @Output() modalSave = new EventEmitter<any>();

  Model: RequestLogDto = new RequestLogDto();

  Request: RequestDTO = new RequestDTO();

  OptionButtons: OptionButton[];

  errors: any = {};

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;

  constructor(private _adminRequestService: AdminRequestService) {
    super();
  }

  ngOnInit(): void {
    this.Model.requestStatus = 3;
  }

  show(data: RequestDTO) {
    this.setButtonOptions(true);

    this.Request = data;
    this.entityComponent.show();
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

  close() {
    this.modalSave.emit();
    this.entityComponent.close();
  }

  save() {
    if (!this.isEmptyOrNullString(this.Model.textLog)) {
      this.Request.log = this.Model;
      this._adminRequestService
        .reject(this.Request)
        .subscribe((response_: RequestResult) => this.validResponse(response_));
    }
  }

  validResponse(requestResult: RequestResult) {

    if (requestResult.success) {
      this.success(requestResult.title, requestResult.messageResponse);
      this.close();
    } else {
      this.error(requestResult.title, requestResult.messageResponse);
    }
  }
}
