import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/services/auth.guard';
import { ListDocumentTypesComponent } from './list-document-types/list-document-types.component';

const routes: Routes = [
  {
    path: '',
    component: ListDocumentTypesComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentTypeRoutingModule {}
