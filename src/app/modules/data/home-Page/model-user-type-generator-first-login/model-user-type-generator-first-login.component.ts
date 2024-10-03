import { AuthenticationService } from 'src/app/_base/services/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalWithOptionButtonsComponent } from 'src/app/shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from 'src/app/shared/models/option-button';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';

@Component({
  selector: 'app-model-user-type-generator-first-login',
  templateUrl: './model-user-type-generator-first-login.component.html',
  styleUrls: []
})
export class ModelUserTypeGeneratorFirstLoginComponent extends AppComponentBase implements OnInit {

  OptionButtons: OptionButton[];
  title: string = 'Usuario Generador';
  errors: any = {};
  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;

  constructor(private _authentication: AuthenticationService) {
    super();
  }
  ngOnInit(): void {

    this.initializeView();
  }

  async initializeView() {
    this.errors = {};
  }

  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    this.OptionButtons = [
      new OptionButton(
        'close',
        'No',
        'btn btn-danger pull-right',
        'fa fa-times'
      ),
      new OptionButton(
        'save',
        'Si',
        'btn btn-success pull-right',
        'fa fa-save',
        permission
      ),
    ];
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case "save":
        this.si();
        break;
      case 'close':
        this.no();
        break;
    }
  }

  no() {
    this._authentication.updateItFirstLogin()
    .subscribe(() => {
      this.entityComponent.close();
    });
  }

  si() {
    this._authentication.updateUserTypeGenerator()
    .subscribe(() => {
      this.entityComponent.close();
    });
  }
  async showModal() {
    await this.initializeView();
    this.setButtonOptions();
    this.entityComponent.show();
  }
}
