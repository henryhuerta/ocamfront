import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/services/auth.guard';
import { ListRequestTypesComponent } from './list-request-types/list-request-types.component';

const routes: Routes = [
    { path: '', component: ListRequestTypesComponent, canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RequestTypeRoutingModule { }
