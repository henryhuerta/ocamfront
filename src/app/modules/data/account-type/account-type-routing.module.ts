import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/services/auth.guard';
import { ListAccountTypesComponent } from './list-account-types/list-account-types.component';

const routes: Routes = [
  {
    path: '',
    component: ListAccountTypesComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountTypeRoutingModule {}
