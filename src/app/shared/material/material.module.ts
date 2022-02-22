import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatInputModule, MatCheckboxModule,
  MatProgressBarModule, MatMenuModule, MatIconModule, MatSelectModule,
  MatCardModule, MatSliderModule, MatListModule, MatDialogModule, MatTabsModule,
  MatGridListModule, MatTooltipModule, MatSnackBarModule, MatTableModule,
  MatPaginatorModule, MatChipsModule, MatSidenavModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatSliderModule,
    MatListModule,
    MatDialogModule,
    MatTabsModule,
    MatGridListModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSidenavModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatSliderModule,
    MatListModule,
    MatDialogModule,
    MatTabsModule,
    MatGridListModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSidenavModule
  ],
  declarations: []
})
export class MaterialModule { }
