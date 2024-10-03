import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/services/auth.guard';
import { ListAccountsComponent } from './list-account/list-accounts.component';

const routes: Routes = [

    { path: '', component: ListAccountsComponent, canActivate: [AuthGuard], pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
