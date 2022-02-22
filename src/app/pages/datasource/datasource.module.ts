import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { MaterialModule } from '../../shared/material/material.module';

import { DatasourceRoutingModule } from './datasource-routing.module';

import { DatasourceService } from '../../core/services/datasource.service';

import { DatasourceComponent } from './datasource.component';
import { DatasourceItemComponent } from './datasource-item/datasource-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgPipesModule,
    DatasourceRoutingModule,
    MaterialModule
  ],
  providers: [
    DatasourceService
  ],
  declarations: [DatasourceComponent, DatasourceItemComponent]
})
export class DatasourceModule { }
