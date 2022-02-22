import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxDataGridModule, DxChartModule } from 'devextreme-angular';
import { MaterialModule } from '../material/material.module';

import { InputBoxSpinnerComponent } from './input-box-spinner/input-box-spinner.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxChartModule,
    MaterialModule
  ],
  declarations: [
    InputBoxSpinnerComponent,
    ConfirmModalComponent
  ],
  exports: [
    InputBoxSpinnerComponent,
    ConfirmModalComponent
  ],
  entryComponents: [
    ConfirmModalComponent
  ]
})
export class ComponentsModule { }
