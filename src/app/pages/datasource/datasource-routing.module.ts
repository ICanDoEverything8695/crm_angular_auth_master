import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatasourceComponent } from './datasource.component';
import { DatasourceItemComponent } from './datasource-item/datasource-item.component';

const routes: Routes = [
  {
    path: '',
    component: DatasourceComponent
  }, {
    path: ':id',
    component: DatasourceItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatasourceRoutingModule { }
