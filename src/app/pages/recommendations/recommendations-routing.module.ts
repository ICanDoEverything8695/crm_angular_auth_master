import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendationsComponent } from './recommendations.component';

const routes: Routes = [
  {
    path: '',
    component: RecommendationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommendationsRoutingModule { }
