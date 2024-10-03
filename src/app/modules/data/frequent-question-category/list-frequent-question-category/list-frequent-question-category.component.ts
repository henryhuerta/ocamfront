import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { CreateOrUpdateFrequentquestioncategoryComponent } from '../create-or-update-frequent-question-category/create-or-update-frequent-question-category.component';
import { FrequentQuestionCategoryDto } from '../dtos/frequent-question-category-dtos';
import { FrequentquestioncategoryService } from '../frequent-question-category.service';

@Component({
  selector: 'app-list-frequentquestioncategory',
  templateUrl: './list-frequent-question-category.component.html',
  styleUrls: []
})
export class ListFrequentquestioncategoryComponent extends AppComponentBase implements OnInit {
  title: string = "Categoria de FAQ";

  columns: any[] = [];
  GridData: FrequentQuestionCategoryDto[] = [];

  public get data (){
    return this.GridData;
  }

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateFrequentquestioncategoryComponent;

  constructor(
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
        dataField: "name",
        caption: "Nombre",
        allowEditing: false
      },
      {
        dataField: "description",
        caption: "Descripción",
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
    this.setColumns();
    this.getGridData();
  }

  getGridData() {
   this._frequentQuestionCategoryService.getAll().subscribe(result =>
     {
      this.GridData = [...result];

  });
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: FrequentQuestionCategoryDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: FrequentQuestionCategoryDto) {
    if (requestResult.success) {
      this.getGridData();
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: FrequentQuestionCategoryDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let response_: RequestResult = new RequestResult();
      this._frequentQuestionCategoryService.disable(data.id).subscribe((response_: RequestResult) => response_ = response_);
      this.validResponseDisableEnableAction(response_, data);

    }

  }
  async enable(data: FrequentQuestionCategoryDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let response_: RequestResult = new RequestResult();
      this._frequentQuestionCategoryService.enable(data.id).subscribe((response_: RequestResult) => response_ = response_);
      this.validResponseDisableEnableAction(response_, data);

    }

  }
}
