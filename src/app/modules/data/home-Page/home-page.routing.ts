import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/services/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [

    { path: '', component: HomePageComponent, canActivate: [AuthGuard], pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class homePageRoutingModule {}
