import { identifierName } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalWithOptionButtonsComponent } from 'src/app/shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from 'src/app/shared/models/option-button';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { FrequentquestioncategoryService } from '../../frequent-question-category/frequent-question-category.service';
import { FrequentQuestionDto } from '../dtos/frequent-question-dtos';
import { FrequentquestionService } from '../frequent-question.service';
@Component({
  selector: 'app-create-or-update-frequent-question',
  templateUrl: './create-or-update-frequent-question.component.html',
  styleUrls: []
})
export class CreateOrUpdateFrequentQuestionComponent extends AppComponentBase implements OnInit {
  Model: FrequentQuestionDto = new FrequentQuestionDto();
  OptionButtons: OptionButton[];
  errors: any = {};

  DxSelectBoxData: any = {};
  categories: any[] = [];

  title: string = "Preguntas Frecuentes";

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  DxDataSourceState: any = {};

  constructor(
    private _FrequentQuestionService: FrequentquestionService,
    private _FrequentQuestionCategoryService: FrequentquestioncategoryService
  ) {
    super();
  }

  async ngOnInit() {
    await this.initializeView();
    // this.getSelectBox();
  }


  async initializeView() {
    this.errors = {};
    this._FrequentQuestionCategoryService.getActives().subscribe(result => {
      result.forEach(cat => {
        this.categories =[];
          this.categories.push({value: cat.id, text: cat.name})
      });
      this.DxSelectBoxData = this.getDataSourceDx(this.categories);

    });

  }


  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    this.OptionButtons = [
      new OptionButton("close", "Cerrar", "btn btn-danger pull-right", "fa fa-times"),
      new OptionButton("save", "Guardar", "btn btn-success pull-right", "fa fa-save", permission)
    ];
  }

  async showUpdate(data: FrequentQuestionDto) {

    await this.initializeView();
    this.setButtonOptions(true);
    this._FrequentQuestionService.getById(data.id).subscribe((response_: FrequentQuestionDto) => {
      this.Model = response_;
    });
    this.entityComponent.show();
  }

  async showAdd() {
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new FrequentQuestionDto();
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

      this._FrequentQuestionService.create(this.Model)
        .subscribe((response_: RequestResult) => this.validResponse(response_));


    } else {

      this._FrequentQuestionService.update(this.Model, this.Model.id)
        .subscribe((response_: RequestResult) => this.validResponse(response_));
    }
  }

  close() {
    this.entityComponent.close();
  }


}
