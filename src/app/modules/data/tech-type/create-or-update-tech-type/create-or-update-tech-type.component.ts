import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalWithOptionButtonsComponent } from 'src/app/shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from 'src/app/shared/models/option-button';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { TechTypeDto } from '../dtos/tech-type-dtos';
import { TechtypeService } from '../tech-type.service';

@Component({
  selector: 'app-create-or-update-tech-type',
  templateUrl: './create-or-update-Tech-Type.component.html',
  styleUrls: ['./create-or-update-Tech-Type.component.scss']
})
export class CreateOrUpdateTechTypeComponent extends AppComponentBase implements OnInit {
  Model: TechTypeDto = new TechTypeDto();
  OptionButtons: OptionButton[];
  errors: any = {};

  DxSelectBoxData: any = {};

  title: string = "Tipos de Tecnologías";

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  DxDataSourceState: any = {};

  constructor(
    private _TechTypeService: TechtypeService
  ) {
    super();
  }

  async ngOnInit() {
    await this.initializeView();
    this.getSelectBox();
  }

  getSelectBox() {
    this.DxSelectBoxData = this.getDataSourceDx([{
      text: "Text 1",
      value: 1
    }]);
  }

  async initializeView() {
    this.errors = {};
  }


  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    this.OptionButtons = [
      new OptionButton("close", "Cerrar", "btn btn-danger pull-right", "fa fa-times"),
      new OptionButton("save", "Guardar", "btn btn-success pull-right", "fa fa-save", permission)
    ];
  }

  async showUpdate(data: TechTypeDto) {
    await this.initializeView();
    this.setButtonOptions(true);
    this._TechTypeService.getById(data.id).subscribe((response_: TechTypeDto) => {
      this.Model = response_;
    });
    this.entityComponent.show();
  }

  async showAdd() {
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new TechTypeDto();
    this.entityComponent.show();
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case "save":
        this.save();
        break;
      case "close":
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

  async save() {
    if (this.isEmptyOrNullNumber(this.Model.id)) {

      this._TechTypeService.create(this.Model)
        .subscribe((response_: RequestResult) => this.validResponse(response_));


    } else {

      this._TechTypeService.update(this.Model, this.Model.id)
        .subscribe((response_: RequestResult) => this.validResponse(response_));
    }
  }

  close() {
    this.entityComponent.close();
  }


}
