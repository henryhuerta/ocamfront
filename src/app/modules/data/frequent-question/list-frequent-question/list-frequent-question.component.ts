import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { FrequentQuestionCategoryDto } from '../../frequent-question-category/dtos/frequent-question-category-dtos';
import { FrequentquestioncategoryService } from '../../frequent-question-category/frequent-question-category.service';
import { CreateOrUpdateFrequentQuestionComponent } from '../create-or-update-frequent-question/create-or-update-frequent-question.component';
import { FrequentQuestionDto } from '../dtos/frequent-question-dtos';
import { FrequentquestionService } from '../frequent-question.service';

@Component({
  selector: 'app-list-frequent-question',
  templateUrl: './list-frequent-question.component.html',
  styleUrls: []
})
export class ListFrequentQuestionComponent extends AppComponentBase implements OnInit {
  title: string = "Preguntas Frecuentes";

  columns: any[] = [];
  GridData: FrequentQuestionDto[] = [];
  categories: FrequentQuestionCategoryDto[] = [];

  public get data (){
    return this.GridData;
  }

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateFrequentQuestionComponent;

  constructor(
    private _frequentQuestionService: FrequentquestionService,
    private _frequentQuestionCategoryService: FrequentquestioncategoryService
  ) {
    super();
  }

  setColumns() {
    this.columns = [
      {
        dataField: "id",
        caption: "Acciones",
        allowEditing: false,
        width: "120",
        cellTemplate: "actionTemplate",
        alignment: "center",
        allowExporting: true
      },
      {
        dataField: "question",
        caption: "Preguntas",
        allowEditing: false
      },
      {
        dataField: "answer",
        caption: "Respuestas",
        allowEditing: false
      },
      {
        dataField: "isActive",
        caption: "Estado",
        allowEditing: false,
        width: "120",
        alignment: "center",
        cellTemplate: "statusTemplate",
        calculateDisplayValue: (value: boolean) => value ? "ACTIVE" : "INACTIVE"
      }
    ];
  }

  ngOnInit(): void {
    this.getCategories();
    this.setColumns();
    this.getGridData();
  }

  getGridData() {
   this._frequentQuestionService.getAll().subscribe(result =>
     {
      this.GridData = [...result];

  });
  }

  getcategory(id: number){
    this.categories.find(x => x.id === id);
  }

  getCategories() {
    this._frequentQuestionCategoryService.getAll().subscribe(result => this.categories = result);
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: FrequentQuestionDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: FrequentQuestionDto) {
    if (requestResult.success) {
      this.getGridData();
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: FrequentQuestionDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let response_: RequestResult = new RequestResult();
      this._frequentQuestionService.disable(data.id).subscribe((response_: RequestResult) => response_ = response_);
      this.validResponseDisableEnableAction(response_, data);

    }

  }
  async enable(data: FrequentQuestionDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let response_: RequestResult = new RequestResult();
      this._frequentQuestionService.enable(data.id).subscribe((response_: RequestResult) => response_ = response_);
      this.validResponseDisableEnableAction(response_, data);

    }

  }
}
