import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/services/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [

    { path: '', component: ProfileComponent, canActivate: [AuthGuard], pathMatch: 'full'  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
