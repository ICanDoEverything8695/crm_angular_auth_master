import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsFitler } from '../../../core/models';
import { MaterialModule } from '../../../shared/material/material.module';
import { DxChartModule, DxRangeSliderModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, DxChartModule, DxRangeSliderModule, FormsModule ],
      declarations: [ SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    component.verticals = [];
    component.analytics_filter = new AnalyticsFitler();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
