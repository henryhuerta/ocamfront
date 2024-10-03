import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'certifier',
    loadChildren: () =>
      import('./certifier/certifier.module').then((m) => m.CertifierModule),
  },
  {
    path: 'document-type',
    loadChildren: () =>
      import('./document-type/document-type.module').then(
        (m) => m.DocumentTypeModule
      ),
  },
  {
    path: 'account-type',
    loadChildren: () =>
      import('./account-type/account-type.module').then(
        (m) => m.AccountTypeModule
      ),
  },
  {
    path: 'techtype',
    loadChildren: () =>
      import('./tech-type/tech-type.module').then(
        (m) => m.TechtypeModule
        ),
  },
  {
    path: 'frequentquestioncategory',
    loadChildren: () =>
      import('./frequent-question-category/frequent-question-category.module').then(
        (m) => m.FrequentquestioncategoryModule
        ),
  },
  {
    path: 'frequentquestion',
    loadChildren: () =>
      import('./frequent-question/frequent-question.module').then(
        (m) => m.FrequentquestionModule
        ),
  },
  {
    path: 'request-types',
    loadChildren: () =>
      import('./request-types/request-types.module').then(
        (m) => m.RequestTypesModule
      ),
  },
  {
    path: 'home-page',
    loadChildren: () =>
      import('./home-Page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: 'spot-market',
    loadChildren: () =>
      import('./spot-market/spot-market.module').then(
        (m) => m.SpotMarketModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataRoutingModule { }
