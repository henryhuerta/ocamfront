import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrequentquestionRouting } from './frequent-question.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListFrequentQuestionComponent } from './list-frequent-question/list-frequent-question.component';
import { CreateOrUpdateFrequentQuestionComponent } from './create-or-update-frequent-question/create-or-update-frequent-question.component';
import { FAQComponent } from './faq/faq.component';
import { NgbAccordion, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DevExtremeModule, DxAccordionComponent } from 'devextreme-angular';


@NgModule({
  declarations: [ListFrequentQuestionComponent, CreateOrUpdateFrequentQuestionComponent, FAQComponent],
  imports: [
    SharedModule,
    FrequentquestionRouting,
    NgbModule,
    DevExtremeModule
  ]
})
export class FrequentquestionModule { }
