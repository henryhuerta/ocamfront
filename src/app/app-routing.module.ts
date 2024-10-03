import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/services/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./_metronic/layout/layout.module').then((m) => m.LayoutModule),
  },
  { path: '**', redirectTo: 'error/404' },
  {
    path: 'operation',
    loadChildren: () =>
      import('./modules/opr/operation/operation.module').then(
        (m) => m.OperationModule
      ),
  },
  {
    path: 'request',
    loadChildren: () =>
      import('./modules/opr/request/request.module').then(
        (m) => m.RequestModule
      ),
  },
  {
    path: 'administration',
    loadChildren: () =>
      import('./modules/admin/administration.module').then(
        (m) => m.AdministrationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
