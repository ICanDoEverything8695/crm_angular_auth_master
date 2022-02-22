import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TotalPurchases, TotalPurchasesGraphSchema } from '../../../core/models/dashboard.model';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { MatCardModule } from '@angular/material';
import { DxChartModule } from 'devextreme-angular';

import { StatusComponent } from './status.component';

describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatCardModule, DxChartModule, PipesModule ],
      declarations: [ StatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    component.totalPurchases = new TotalPurchases();
    component.totalPurchasesGraphData = [];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
