import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'app/shared/material/material.module';
import { ComponentsModule } from '../../../shared/components/components.module';

import { PurchasesRoutingModule } from './purchases-routing.module';

import { PurchasesComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PurchasesRoutingModule,
    ComponentsModule
  ],
  declarations: [
    // PurchasesComponent
  ]
})
export class PurchasesModule { }
