import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/services/auth.guard';
import { FAQComponent } from './faq/faq.component';

import { ListFrequentQuestionComponent } from './list-frequent-question/list-frequent-question.component';

const routes: Routes = [
 { path: '', component: ListFrequentQuestionComponent, canActivate: [AuthGuard], pathMatch: 'full' },
 { path: 'faq', component: FAQComponent, canActivate: [AuthGuard], pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrequentquestionRouting { }
