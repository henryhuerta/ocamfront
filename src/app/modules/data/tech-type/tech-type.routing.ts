import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/services/auth.guard';
import { ListtechtypeComponent } from './list-tech-type/list-tech-type.component';

const routes: Routes = [
    { path: '', component: ListtechtypeComponent, canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TechtypeRoutingModule { }
