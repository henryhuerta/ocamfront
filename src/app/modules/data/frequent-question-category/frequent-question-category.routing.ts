import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/services/auth.guard';
import { ListFrequentquestioncategoryComponent } from './list-frequent-question-category/list-frequent-question-category.component';

const routes: Routes = [
    { path: '', component: ListFrequentquestioncategoryComponent, canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FrequentQuestionCategoryRoutingModule { }
