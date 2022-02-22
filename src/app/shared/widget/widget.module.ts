import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MaStringWidgetComponent } from './ma-string-widget/ma-string-widget.component';
import { MaTextAreaWidgetComponent } from './ma-textarea-widget/ma-textarea-widget.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    MaStringWidgetComponent,
    MaTextAreaWidgetComponent
  ],
  entryComponents: [
    MaStringWidgetComponent,
    MaTextAreaWidgetComponent
  ],
  declarations: [MaStringWidgetComponent, MaTextAreaWidgetComponent]
})
export class WidgetsModule { }
