import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { ListProjectRequestComponent } from './project-request/list-project-request/list-project-request.component';
import { ListRequestsComponent } from './request/list-requests/list-requests.component';

const routes: Routes = [
  {
    path: 'project-requests',
    component: ListProjectRequestComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'requests',
    component: ListRequestsComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
