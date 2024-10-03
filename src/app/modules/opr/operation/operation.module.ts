import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OperationRoutingModule } from './operation.routing';
import { OperationsComponent } from './operations/operations.component';
import { RegisterProjectComponent } from './register-project/register-project.component';
import { CancelCertificatesComponent } from './cancel-certificates/cancel-certificates.component';
import { RedeemCertificatesComponent } from './redeem-certificates/redeem-certificates.component';
import { TransferCertificatesComponent } from './transfer-certificates/transfer-certificates.component';
import { ResumeVerificationPlantsComponent } from './common/resume-verification-plants/resume-verification-plants.component';
import { TransactionCompletedUncompletedComponent } from './common/transaction-completed-uncompleted/transaction-completed-uncompleted.component';
@NgModule({
  declarations: [
    OperationsComponent,
    RegisterProjectComponent,
    TransferCertificatesComponent,
    RedeemCertificatesComponent,
    CancelCertificatesComponent,
    ResumeVerificationPlantsComponent,
    TransactionCompletedUncompletedComponent,
  ],
  imports: [OperationRoutingModule, CommonModule, SharedModule],
  exports: [],
  providers: [DatePipe],
})
export class OperationModule {}
