import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateOrUpdateFrequentquestioncategoryComponent } from './create-or-update-frequent-question-category/create-or-update-frequent-question-category.component';
import { FrequentQuestionCategoryRoutingModule } from './frequent-question-category.routing';
import { ListFrequentquestioncategoryComponent } from './list-frequent-question-category/list-frequent-question-category.component';



@NgModule({
  declarations: [ListFrequentquestioncategoryComponent,CreateOrUpdateFrequentquestioncategoryComponent],
  imports: [
    SharedModule,
    FrequentQuestionCategoryRoutingModule

  ]
})
export class FrequentquestioncategoryModule { }
