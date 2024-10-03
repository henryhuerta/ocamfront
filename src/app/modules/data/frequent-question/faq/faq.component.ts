import { FrequentquestioncategoryService } from './../../frequent-question-category/frequent-question-category.service';
import { FrequentQuestionDto } from './../dtos/frequent-question-dtos';
import { FrequentQuestionCategoryDto } from './../../frequent-question-category/dtos/frequent-question-category-dtos';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent extends AppComponentBase implements OnInit {
  Model: FrequentQuestionCategoryDto = new FrequentQuestionCategoryDto();
  categories: FrequentQuestionCategoryDto[];
  faq: FrequentQuestionDto[];
  errors: any = {};
  constructor(
    private _faqCategoryService: FrequentquestioncategoryService
  ) {
    super();
  }
  public get data (){
    return this.Model;
  }
  ngOnInit(): void {
  this.getData();
  }
  getData() {

    this._faqCategoryService.getFrequentQuestionCategoryByFrequentQuestion().subscribe((result: FrequentQuestionCategoryDto[]) => {
     this.categories = result;
   });
   }
}
