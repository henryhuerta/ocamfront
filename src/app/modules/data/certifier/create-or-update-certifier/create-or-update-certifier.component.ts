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
import { CertifierService } from '../certifier.service';
import { CertifierDto } from '../dtos/certifier-dto';

@Component({
  selector: 'app-create-or-update-certifier',
  templateUrl: './create-or-update-certifier.component.html',
  styleUrls: ['./create-or-update-certifier.component.scss'],
})
export class CreateOrUpdateCertifierComponent
  extends AppComponentBase
  implements OnInit
{
  Model: CertifierDto = new CertifierDto();
  OptionButtons: OptionButton[];
  errors: any = {};

  DxSelectBoxData: any = {};

  title: string = 'Certificadoras';

  @ViewChild('entityComponent')
  entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  DxDataSourceState: any = {};

  constructor(private _certifierService: CertifierService) {
    super();
  }

  ngOnInit() {
    this.Model = new CertifierDto();
    this.initializeView();
    this.getSelectBox();
  }

  getSelectBox() {
    this.DxSelectBoxData = this.getDataSourceDx([
      {
        text: 'Text 1',
        value: 1,
      },
    ]);
  }

  async initializeView() {
    this.errors = {};
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

  showUpdate(data: CertifierDto) {
    this.initializeView();
    this.setButtonOptions(true);
    this._certifierService
      .getById(data.id)
      .subscribe((response_: CertifierDto) => {
        debugger;
        this.Model = response_;
        this.setButtonOptions(true);
        this.entityComponent.show();
      });
  }

  async showAdd() {
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new CertifierDto();
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
    debugger;
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
      this._certifierService
        .create(this.Model)
        .subscribe((response_: RequestResult) => this.validResponse(response_));
    } else {
      this._certifierService
        .update(this.Model)
        .subscribe((response_: RequestResult) => this.validResponse(response_));
    }
  }

  close() {
    this.entityComponent.close();
  }
}
