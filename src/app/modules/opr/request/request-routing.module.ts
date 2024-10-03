import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/services/auth.guard';
import { CreateRequestByTypeComponent } from './requests/create-request-by-type/create-request-by-type.component';
import { RequestsComponent } from './requests/requests.component';

const routes: Routes = [
  {
    path: '',
    component: RequestsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'create-request',
        pathMatch: 'full',
      },
      {
        path: 'create-request',
        component: CreateRequestByTypeComponent,
      },
      {
        path: 'create-request/:id',
        component: CreateRequestByTypeComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestRoutingModule {}
