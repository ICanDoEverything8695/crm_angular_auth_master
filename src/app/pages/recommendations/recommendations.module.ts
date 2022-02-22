import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpansionPanelsModule } from 'ng2-expansion-panels';

import { RecommendationsRoutingModule } from './recommendations-routing.module';
import { RecommendationsComponent } from './recommendations.component';

@NgModule({
  imports: [
    CommonModule,
    RecommendationsRoutingModule,
    ExpansionPanelsModule
  ],
  declarations: [
    RecommendationsComponent
  ]
})
export class RecommendationsModule { }
