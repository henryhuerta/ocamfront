import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/services/auth.guard';
import { ListCertifierComponent } from './list-certifier/list-certifier.component';

const routes: Routes = [
  {
    path: '',
    component: ListCertifierComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CertifierRoutingModule {}
