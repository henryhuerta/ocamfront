import { Routes } from '@angular/router';
import { AuthGuard } from '../modules/auth/services/auth.guard';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'data',
    loadChildren: () =>
      import('../modules/data/data.module').then((m) => m.DataModule),
  },
  {
    path: 'operation',
    loadChildren: () =>
      import('../modules/opr/operation/operation.module').then(
        (m) => m.OperationModule
      ),
  },
  {
    path: 'request',
    loadChildren: () =>
      import('../modules/opr/request/request.module').then(
        (m) => m.RequestModule
      ),
  },
  {
    path: 'administration',
    loadChildren: () =>
      import('../modules/admin/administration.module').then(
        (m) => m.AdministrationModule
      ),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
