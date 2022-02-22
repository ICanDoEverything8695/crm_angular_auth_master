import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyticsComponent } from '.';
import { PurchasesComponent } from './purchases/purchases.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsComponent,
    children: [
      {
        path: 'purchases',
        component: PurchasesComponent
      }, {
        path: '**',
        redirectTo: 'purchases'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
