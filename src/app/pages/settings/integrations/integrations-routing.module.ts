import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntegrationsComponent } from './integrations.component';

const routes: Routes = [
  { path: ':id', component: IntegrationsComponent },
  { path: '**', component: IntegrationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegrationsRoutingModule { }
