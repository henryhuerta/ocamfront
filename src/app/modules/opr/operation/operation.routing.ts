import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationsComponent } from './operations/operations.component';
import { RegisterProjectComponent } from './register-project/register-project.component';
import { TransferCertificatesComponent } from './transfer-certificates/transfer-certificates.component';
import { RedeemCertificatesComponent } from './redeem-certificates/redeem-certificates.component';
import { CancelCertificatesComponent } from './cancel-certificates/cancel-certificates.component';
import { AuthGuard } from '../../auth/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: OperationsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'register-project', pathMatch: 'full' },
      { path: 'register-project', component: RegisterProjectComponent },
      { path: 'transfers', component: TransferCertificatesComponent },
      { path: 'redemptions', component: RedeemCertificatesComponent },
      { path: 'cancellations', component: CancelCertificatesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationRoutingModule {}
