import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalWithOptionButtonsComponent } from 'src/app/shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from 'src/app/shared/models/option-button';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { AdminProjectRequestService } from '../admin-project-request.service';
import { RejectProjectRequestDto } from '../dtos/reject-project-request-dto';

@Component({
  selector: 'app-reject-project-request',
  templateUrl: './reject-project-request.component.html',
})
export class RejectProjectRequestComponent
  extends AppComponentBase
  implements OnInit {
  title: string = '¿Esta seguro de rechazar este proyecto?';
  Model: RejectProjectRequestDto = new RejectProjectRequestDto();
  OptionButtons: OptionButton[];

  errors: any = {};

  @ViewChild('entityComponent')
  entityComponent: ModalWithOptionButtonsComponent;

  constructor(private _adminProjectRequestService: AdminProjectRequestService) {
    super();
  }

  ngOnInit(): void {
  }

  show(projectId: number) {
    this.setButtonOptions(true);
    this.Model.id = projectId;
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
    this.entityComponent.close();
  }

  save() {
    if (!this.isEmptyOrNullString(this.Model.text)) {
      this._adminProjectRequestService
        .reject(this.Model)
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
