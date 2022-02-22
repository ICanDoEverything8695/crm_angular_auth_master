import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

import { DxChartModule, DxSelectBoxModule, DxRangeSliderModule } from 'devextreme-angular';
import { MaterialModule } from '../../shared/material/material.module';
import { AnalyticsRoutingModule } from './analytics.routing.module';
import { GraphqlService } from '../../core/services/graphql.service';
import { ComponentsModule } from '../../shared/components/components.module';
import { PipesModule } from '../../shared/pipes/pipes.module';

import { AnalyticsComponent, BreadcrumbComponent, StatusComponent, SidebarComponent } from '.';

import { PurchasesComponent } from './purchases/purchases.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AnalyticsRoutingModule,
    MaterialModule,
    DxChartModule,
    DxSelectBoxModule,
    DxRangeSliderModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [
    AnalyticsComponent,
    BreadcrumbComponent,
    StatusComponent,
    SidebarComponent,
    PurchasesComponent
  ],
  providers: [
    GraphqlService
  ]
})
export class AnalyticsModule { }
