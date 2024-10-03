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
import { AccountTypeRequirementDto } from '../dtos/account-type-dto';

@Component({
  selector: 'app-create-or-update-account-requirement',
  templateUrl: './create-or-update-account-requirement.component.html',
  styleUrls: ['./create-or-update-account-requirement.component.scss'],
})
export class CreateOrUpdateAccountRequirementComponent
  extends AppComponentBase
  implements OnInit
{
  title: string = 'Requerimientos';

  Model: AccountTypeRequirementDto = new AccountTypeRequirementDto();
  OptionButtons: OptionButton[];
  errors: any = {};

  @ViewChild('entityComponent')
  entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit(): void {}

  initializeView() {
    this.errors = {};
    this.Model = new AccountTypeRequirementDto();
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

  showUpdate(data: AccountTypeRequirementDto) {
    this.initializeView();
    this.setButtonOptions(true);

    this.Model = data;
    this.entityComponent.show();
  }

  showAdd() {
    this.initializeView();
    this.setButtonOptions();
    this.Model = new AccountTypeRequirementDto();
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
    // if (this.isEmptyOrNullNumber(this.Model.id)) {
    //   this._certifierService.create(this.Model)
    //     .subscribe((response_: RequestResult) => this.validResponse(response_));
    // } else {
    //   // this._certifierService.update(this.Model, this.Model.id)
    //   //   .subscribe((response_: RequestResult) => this.validResponse(response_));
    // }

    this.modalSave.emit(this.Model);
    this.close();
  }

  close() {
    this.entityComponent.close();
  }
}
